<template>
  <div ref="mapContainer" id="localHeatmap" class="bing_map"></div>
</template>
   
<script setup >
import { ref, onMounted } from "vue";
import L from "leaflet"; // 引入leaflet插件
import "leaflet/dist/leaflet.css";
import "leaflet.heat"; // 引入leaflet.heat插件


const mapContainer = ref(null);
const map = ref(null);
const heatLayer = ref(null);
const layer = ref(null);
const heatDataList = ref([
  { lat: 22.973805, lng: 113.189162, value: 999 },
  { lat: 23.034978, lng: 113.36676, value: 81 },
  { lat: 23.029139, lng: 113.36503, value: 82 },
  { lat: 23.01746, lng: 113.35407, value: 93 },
  { lat: 23.009496, lng: 113.367914, value: 84 },
  { lat: 23.005333, lng: 113.335193, value: 85 },
  { lat: 23.003551, lng: 113.315272, value: 86 },
  { lat: 22.993617, lng: 113.303927, value: 87 },
  { lat: 22.983938, lng: 113.276812, value: 88 },
  { lat: 22.988475, lng: 113.263313, value: 90 },
  { lat: 23.001436, lng: 113.274937, value: 30 },
  { lat: 23.002641, lng: 113.287871, value: 86 },
  { lat: 23.000079, lng: 113.305061, value: 33 },
  { lat: 23.016053, lng: 113.270026, value: 98 },
]);
onMounted(() => {
  initializeMap()

});

// 初始化地图
function initializeMap() {
  // 创建地图
  map.value = L.map(mapContainer.value).setView([22.973805, 113.189162], 12);

  // 添加瓦片图层
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors",
  }).addTo(map.value);

  // 生成热力图图层，并添加到地图中
  heatLayer.value = L.heatLayer(heatDataList.value, {
    radius: 30,
    minOpacity: 0.6,
  }).addTo(map.value);
};
</script>
   
  <style lang="scss" scoped>
.bing_map {
  width: 100%;
  margin: 0px 20px 20px 20px;
  height: 69vh;
  border: solid 1px gainsboro;
}
</style>