<template>
  <div class="upload">
    <input  type="file" ref="fileUpload" @change="fileChange">
    <div v-if="file" class="fileInfo">
      <div class="chunksBox">
        <div v-for="(item, index) in refchunks" class="chunk ready" :class="uploadStatus(index)">
          <p>分片{{ index }}</p>
          <p>大小：{{ kb2mb(item.size) }}Mb</p>
        </div>
      </div>
      <p> 文件大小： {{ kb2mb(file.size) }}Mb</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue"
const fileUpload = ref(null)
const file = ref(null)
const refchunks = ref(null)
const refchunkSize = ref(1024 * 1024);  // 1MB
const refuploadSatus = ref({})


// 创建一个计算属性，转换单位
const kb2mb = computed(() => {
  return function (size) {
    return (size / 1024 / 1024).toFixed(2)
  }
});
// 创建一个计算属性，将number加倍
const uploadStatus = computed(() => {
  return function (index) {
    return refuploadSatus.value[index]
  }
});

// inputchange事件
function fileChange(event) {
  const fileflow = event.target.files[0]
  file.value = fileflow
  // 创建文件分片
  const chunks = createChunks(fileflow)
  refchunks.value = chunks
  upload()
}

// 创建文件分片
const createChunks = (file) => {
  let start = 0;
  const chunks = [];
  while (start < file.size) {
    chunks.push(file.slice(start, start + refchunkSize.value));
    start += refchunkSize.value;
  }
  return chunks;
};

// 模拟上传
async function upload() {
  const chunks = refchunks.value
  const maxParallelUploads = 5; // 最大并行上传数量
  let currentIndex = 0; // 当前正在上传的分片索引
  let uploadedCount = 0; // 已成功上传的分片数量

  // 上传单个分片的函数
  function uploadChunk(chunkIndex) {
    // 开始上传 改变状态
    refuploadSatus.value[chunkIndex] = 'active'
    // return
    // 模拟上传时间，这里用 setTimeout 模拟异步上传
    setTimeout(() => {
      console.log("上传分片 " + chunkIndex + " 成功");
      // 上传成功 改变状态
      refuploadSatus.value[chunkIndex] = 'success'
      uploadedCount++;
      // 如果还有未上传的分片，并且当前并行上传数量小于最大并行上传数量
      if (currentIndex < chunks.length && currentIndex - uploadedCount < maxParallelUploads) {
        uploadChunk(currentIndex); // 开始上传下一个分片
        currentIndex++;
      }
      // 如果所有分片都上传完成
      if (uploadedCount === chunks.length) {
        console.log("所有分片上传完成");
      }
    }, Math.random() * 2000); // 为了模拟上传时间随机设置延迟
  }

  // 启动初始的最大并行上传
  for (let i = 0; i < maxParallelUploads && i < chunks.length; i++) {
    uploadChunk(currentIndex);
    currentIndex++;
  }
}


</script>
<style lang="scss" scoped>
.upload{
  margin: 40px 0;

}
.fileInfo {
  .chunksBox {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;

    .chunk {
      width: 20%;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      text-align: center;
      position: relative;
      overflow: hidden;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: linear-gradient(to right, #8BC34A, #4CAF50);
        transform: translateX(-100%); /* 修改这里 */
        transition: transform 10s ease;
      }
    }

    .ready::after {
    }

    .active::after {
      transform: translateX(-1%); /* 修改这里 */
    }

    .success {
      &::after{
        transition: transform .3s ease;
        transform: translateX(0);
      }
    }
  }
}
</style>