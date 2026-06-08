<template>
  <div id="map-container"></div>
</template>
<script>
import { Map, View, Feature } from 'ol'
import { Tile as TileLayer } from 'ol/layer'
import { get } from 'ol/proj';
import { getWidth, getTopLeft } from 'ol/extent'
import { WMTS } from 'ol/source'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import Point from 'ol/geom/Point'
import * as style from 'ol/style'
import sourceVector from 'ol/source/Vector'
import layerVecor from 'ol/layer/Vector'
import Overlay from "ol/Overlay";


export const projection = get("EPSG:4326");
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = [];
for (let z = 2; z < 19; ++z) {
  resolutions[z] = size / Math.pow(2, z);
}

export default {
  data() {
    return {
      map: null,
      dots: [
        {
          position: [114.29800574894763, 30.599445457991475],
          text: '武汉-我生活的城市',
          link: '/column/travel/wuhan'
        },
        {
          position: [115.67622264800985, 30.737311477427692],
          text: '英山-我的出生点'
        },
        {
          position: [121.43387308979692, 31.240550346812213],
          text: '上海-第一次去的大城市'
        },
        {
          position: [113.08684768355832, 29.377162510677937],
          text: '岳阳-洞庭湖夕阳'
        },
        {
          position: [112.95601336278108, 28.18867605958691],
          text: '长沙-橘子洲指点江山',
          link: '/column/travel/changsha'
        },
        {
          position: [112.96615558841211, 28.193970430574545],
          text: '长沙-坡子街美食广场'
        },
      ]
    }
  },
  mounted() {
    this.initMap('SL') // 加载矢量底图
    // this.initMap('YX') // 加载影像底图
    // this.initMap('DX') // 加载地形晕渲
    this.$nextTick(() => {
      this.defaultMark()
    })
  },
  methods: {
    initMap(layerType = 'SL') {
      const TIANDI_KEY = '	1c0a0be1bec78c4b9d07ea55040f6a6b'

      // 对应的值是固定的
      const layerTypeMap = {
        'SL': ['vec', 'cva'], // [矢量底图, 矢量注记]
        'YX': ['img', 'cia'], // [影像底图, 影像注记]
        'DX': ['ter', 'cta']  // [地形晕渲, 地形注记]
      }

      // c: 经纬度投影 w: 球面墨卡托投影
      const matrixSet = 'c'

      this.map = new Map({
        target: 'map-container',
        layers: [
          // 底图
          new TileLayer({
            source: new WMTS({
              url: `https://t{0-6}.tianditu.gov.cn/${layerTypeMap[layerType][0]}_${matrixSet}/wmts?tk=${TIANDI_KEY}`,
              layer: layerTypeMap[layerType][0],
              matrixSet: matrixSet,
              style: "default",
              crossOrigin: 'anonymous', // 解决跨域问题 如无该需求可不添加
              format: "tiles",
              wrapX: true,
              tileGrid: new WMTSTileGrid({
                origin: getTopLeft(projectionExtent),
                //resolutions: res.slice(0, 15),
                resolutions: resolutions,
                matrixIds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
              })
            })
          }),
          // 标注
          new TileLayer({
            source: new WMTS({
              url: `https://t{0-6}.tianditu.gov.cn/${layerTypeMap[layerType][1]}_${matrixSet}/wmts?tk=${TIANDI_KEY}`,
              layer: layerTypeMap[layerType][1],
              matrixSet: matrixSet,
              style: "default",
              crossOrigin: 'anonymous', // 解决跨域问题 如无该需求可不添加
              format: "tiles",
              wrapX: true,
              tileGrid: new WMTSTileGrid({
                origin: getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
              })
            })
          })
        ],
        view: new View({
          center: [112.305393, 35.593098],
          projection: projection,
          zoom: 5,
          maxZoom: 17,
          minZoom: 1
        })
      })
    },

    creatMark(item) {
      const { text, position, link } = item
      const markDom = document.createElement("div");
      // markDom.innerHTML = `<div>🚩</div>`;
      markDom.innerHTML = `
      <a href="${link || '#'}">
        <div class="box">
          <div class="text" ><div>${text}</div></div>
          <div class="dot">🚩</div>
        </div>
      </a>
      `;
      markDom.className = 'custom-overlay'; // 添加自定义的CSS类名

      let overlay = new Overlay({
        element: markDom,
        autoPan: false,
        positioning: "bottom-center",
        // id: idstr,
        stopEvent: false,
        className: "map_remark",
      });
      overlay.setPosition(position);
      this.map.addOverlay(overlay);
    },

    defaultMark() {
      this.dots.forEach(item => {
        this.creatMark(item)
      })
    }
  }
}
</script>
<style scoped lang="scss">
#map-container {
  position: fixed;
  left: 0;
  top: var(--vp-nav-height);
  width: 100vw;
  height: calc(100vh - var(--vp-nav-height));
  z-index:9999
}

:deep(.map_remark) {
  a {
    text-decoration: none;
    color: #333;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  &:hover .text {
    display: block;
  }
  .dot {
    position: relative;
    z-index: 1;
  }
  .text {
    border: 1px solid #409eff;
    font-size: 12px;
    background-color: #fff;
    font-weight: 600;
    padding: 4px;
    border-radius: 6px;
    display: none;
    position: relative;
    z-index: 2;
  }
}
</style>