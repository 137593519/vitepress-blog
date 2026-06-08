<template>
    <ClientOnly>
        <button class="toggle-btn" @click="toggleVirtual">
            {{ isVirtual ? '切换到真实列表' : '切换到虚拟列表' }}
        </button>

        <div v-if="isVirtual">
            <h3>虚拟列表</h3>
            <div v-bind="containerProps" class="virtual_list">
                <div v-bind="wrapperProps">
                    <div v-for="item in list" :key="item.index" style="height: 22px">
                        Row: {{ item.data + 1 }}
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!isVirtual">
            <h3>真实列表</h3>
            <div class="virtual_list">
                <div>
                    <div v-for="item in 100000" :key="item.index" style="height: 22px">
                        Row: {{ item }}
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>
<script setup>
import { ref } from 'vue'
import { useVirtualList } from '@vueuse/core'

const isVirtual = ref(true)
const toggleVirtual = () => { isVirtual.value = !isVirtual.value }

const { list, containerProps, wrapperProps } = useVirtualList(
    Array.from(Array(100000).keys()),
    {
        itemHeight: 22,
    },
)
</script>
<style scoped lang="scss">
.toggle-btn {
    padding: 6px 16px;
    border-radius: 6px;
    border: 1px solid #2a95e2;
    background: #2a95e2;
    color: #fff;
    cursor: pointer;
    margin-bottom: 12px;
    font-size: 14px;
    &:hover {
        background: #1072b8;
        border-color: #1072b8;
    }
}
.virtual_list {
    border-radius: 8px;
    padding-left: 10px;
    height: 300px;
    overflow: auto;
    background: #eee;
}
</style>