<template>
    <n-switch v-model:value="isVirtual" @change="toggleVirtual">
        <template #checked>
            虚拟列表
        </template>
        <template #unchecked>
            真实列表
        </template>
    </n-switch>

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
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { useVirtualList } from '@vueuse/core'
import { NSwitch} from 'naive-ui'

const isVirtual = ref(true)

const { list, containerProps, wrapperProps } = useVirtualList(
    Array.from(Array(100000).keys()),
    {
        // Keep `itemHeight` in sync with the item's row.
        itemHeight: 22,
    },
)


</script>
<style scoped lang="scss">
.virtual_list {
    border-radius: 8px;
    padding-left: 10px;
    height: 300px;
    overflow: auto;
    background: #eee;
}
</style>