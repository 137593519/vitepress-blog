<template>
  <div style="width: 100%;height: 500px;">
    <div @contextmenu.prevent id="coalmap" style="width: 100%;height: 100%;"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { initMap } from '../utils/openlayers.js'

onMounted(() => {
  initialize()
})

// 地图对象
const mapdata = ref({})
// 图层对象
const iconLayer = ref({})
// 地图范围
const textent = [36398509, 4376079, 36402628, 4377811]
function initialize() {
  let datalayerList = [
    {
      paramlayer: 'tdt',
      type: 'tdt',
      layerType:'SL'
    },
    // {
    //   paramlayer: 'coalmap:hbc', // GeoServer发布的图层名称
    //   type: 'wms'
    // }
  ]
  initMap(textent, 'coalmap', mapdata, [iconLayer], datalayerList, 2.5)
}
</script>