<template>
  <div class="upload">
    <input ref="fileUpload" type="file" value="" @change="fileChange"> 
    <div v-if="file" class="fileInfo">
      <div class="chunksBox">
        <div v-for="(item, index) in refchunks" class="chunk">
          <p>分片{{ index }}</p>
          <p>大小：{{ kb2mb(item.size) }}Mb</p>
        </div>
      </div>
      <p> 文件大小： {{ kb2mb(file.size)}}Mb</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from "vue"
const fileUpload = ref(null)
const file = ref(null)
const refchunks = ref(null)
const refchunkSize = ref(1024 * 1024 * 5);  // 1MB


// 创建一个计算属性，将number加倍
const kb2mb = computed(() => {
  return function (size) {
    return (size / 1024 / 1024).toFixed(2)
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
    const chunks = refchunks.value;
    const totalChunks = chunks.length;
    const concurrency = 5;

    let currentIndex = 0;

    // 定义上传函数
    async function uploadChunk(index) {
        const e = chunks[index];
        console.log("开始上传:", e);

        // 模拟上传延迟1秒
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("上传完成:", e);
    }

    // 循环上传
    while (currentIndex < totalChunks) {
        // 并行上传5个任务
        const uploadPromises = [];
        for (let i = 0; i < concurrency && currentIndex < totalChunks; i++) {
            uploadPromises.push(uploadChunk(currentIndex));
            currentIndex++;
        }
        // 等待所有并行任务完成
        await Promise.all(uploadPromises);
    }
}




</script>
<style lang="scss" scoped>
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
    }
  }
}
</style>