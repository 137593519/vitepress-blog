import { Map, View, Feature, Overlay } from "ol";
import Projection from "ol/proj/Projection";
import { Image, Tile} from "ol/layer";
import { ImageStatic, TileWMS } from "ol/source";
import FullScreen from "ol/control/FullScreen";
import LayerVector from "ol/layer/Vector";
import SourceVector from "ol/source/Vector";
import * as control from "ol/control";
import * as extent from "ol/extent";
import * as interaction from "ol/interaction";
import { Style, Icon } from "ol/style";
import Point from "ol/geom/Point";

import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { WMTS } from 'ol/source'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import { getWidth, getTopLeft } from 'ol/extent'

import { get } from 'ol/proj';

/**
 * 初始化地图
 * @param {*} textent 地图范围
 * @param {*} ids dom的id
 * @param {*} mapdata 地图对象
 * @param {*} blanklayerList 显示图层列表
 * @param {*} datalayerList 待添加图层列表
 * @param {*} zoom 层级
 * @param {*} interactions 控制
 */
export function initMap(
  textent,
  ids,
  mapdata,
  blanklayerList,
  datalayerList,
  zoom,
  interactions
) {
  let layers = getLayers(textent, datalayerList);
//   for (let i = 0; i < blanklayerList.length; i++) {
//     let source = new SourceVector();
//     blanklayerList[i].value = new LayerVector({
//       source: source,
//     });
//     layers.push(blanklayerList[i].value);
//   }
  let mapprojection = new Projection({
    code: "EPSG:4326",
    // code: "EPSG:404000",
    units: "degrees",
    extent: textent,
  });

  mapdata.value = new Map({
    layers: layers,
    target: ids,
    view: new View({
    //   projection: mapprojection,
      center: extent.getCenter(textent),
      zoom: zoom ? zoom : 5,
      extent: textent,
    }),
    controls: control.defaults({
      attribution: false,
      rotate: false,
      zoom: false,
    }),
    interactions: interaction.defaults(interactions ? interactions : {}),
  });
  mapdata.value.render();
}

/**
 * 生成地图图层
 * @param {*} textent 图层范围
 * @param {*} datalayerList 图层数据列表
 * [{paramlayer: '图层名',type: 'wms' 类型}]
 * @returns
 */
function getLayers(textent, datalayerList) {
  let extent = textent;
  let layers = [];
  for (let i = 0; i < datalayerList.length; i++) {
    let tData = datalayerList[i];
    if (tData.type == "tdt") {
	  const { layerType } = tData
      // 创建天地图图层
      // 底图
		const projection = get("EPSG:4326");
		const projectionExtent = projection.getExtent();
		const size = getWidth(projectionExtent) / 256;
		const resolutions = [];
		for (let z = 2; z < 19; ++z) {
		resolutions[z] = size / Math.pow(2, z);
		}
	  const TIANDI_KEY = '8d34acb7c1bcab9bba767460e8903825'
 
      // 对应的值是固定的
      const layerTypeMap = {
        'SL': ['vec', 'cva'], // [矢量底图, 矢量注记]
        'YX': ['img', 'cia'], // [影像底图, 影像注记]
        'DX': ['ter', 'cta']  // [地形晕渲, 地形注记]
      }
 
      // c: 经纬度投影 w: 球面墨卡托投影
      const matrixSet = 'c'

	  const tdtLayer = new TileLayer({
		source: new WMTS({
		  url: `http://t{0-6}.tianditu.com/${layerTypeMap[layerType][0]}_${matrixSet}/wmts?tk=${TIANDI_KEY}`,
		  layer: layerTypeMap[layerType][0],
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
      layers.push(tdtLayer);
    } else if (tData.type == "img") {
      let projection = new Projection({
        code: "xkcd-image",
        units: "pixels",
        extent: extent,
      });
      let temLayer = new Image({
        source: new ImageStatic({
          url: `${tData.paramlayer}`,
          projection: projection,
          imageExtent: extent,
        }),
      });
      layers.push(temLayer);
    } else {
      let temLayer = new Tile({
        source: new TileWMS({
          url: import.meta.env.VITE_APP_MAP_URL + "/geoserver/coalmap/wms",
          params: {
            LAYERS: tData.paramlayer,
            TILED: false,
            wrapX: false,
            VERSION: "1.1.0",
          },
          serverType: "geoserver",
        }),
      });
      layers.push(temLayer);
    }
  }
  return layers;
}
/**
 * 引入静态图标创建图标对象
 **/
const imgstyle = new Style({
  image: new Icon({
    anchor: [0.5, 1],
    src: import.meta.env.BASE_URL + `img/icon-biaozhu.png`,
    scale: 0.5,
  }),
});
/**
 * 使用feature
 * coordinate 坐标
 **/
export function setTrmFeature(coordinate) {
  let feature = new Feature({
    type: "icon",
    geometry: new Point(coordinate),
  });
  feature.setStyle(imgstyle);
  return feature;
}
/**
 * 创建overlayer
 * vid dom的id
 * val 传入坐标对象{xAxis: '', yAxis: ''}
 **/
export function setOverlay(vid, val) {
  let container = document.getElementById(vid);
  let overlay = new Overlay({
    id: `odom${vid}`,
    element: container,
    autoPan: true,
    positioning: "bottom-left",
    autoPanAnimation: {
      duration: 250,
    },
  });
  overlay.setPosition([parseFloat(val.xAxis), parseFloat(val.yAxis)]);
  return overlay;
}
