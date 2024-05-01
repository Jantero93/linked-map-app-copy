<template>
  <div ref="mapContainer" class="map-container">
    <!-- This div will host the OpenLayers map. -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch, defineProps } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import type { Layer } from 'ol/layer';
import LayerRenderer from 'ol/renderer/Layer';
import Source from 'ol/source/Source';
import { getUid } from 'ol/util';

interface Props {
  initialView: {
    center: [number, number];
    zoom: number;
  };
  layers: Layer[];
}

const props = defineProps<Props>();
const mapContainer = ref<HTMLElement | null>(null);
let map: Map | null = null;

onMounted(() => {
  if (mapContainer.value) {
    map = new Map({
      target: mapContainer.value,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: props.initialView.center,
        zoom: props.initialView.zoom
      })
    });

    // Add initial layers
    props.layers.forEach((layer) => {
      map?.addLayer(layer);
    });

    // Resize map by container size
    new ResizeObserver(() => map?.updateSize()).observe(mapContainer.value);
  }
});

onUnmounted(() => {
  map?.getLayers().clear();
  map?.setTarget(undefined);
});

// Watch for changes in the layers
watch(
  () => props.layers,
  (newLayers, oldLayers) => {
    if (areLayersEqual(newLayers, oldLayers)) {
      return; // Skip unnecessary updates
    }
    // Remove old layers first & Re-add all new layers
    map?.getLayers().clear();
    newLayers.forEach((layer) => map?.addLayer(layer));
  },
  { deep: true }
);

function areLayersEqual(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newLayers: Layer<Source, LayerRenderer<any>>[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  oldLayers: Layer<Source, LayerRenderer<any>>[]
) {
  return (
    newLayers.length === oldLayers.length &&
    newLayers.every(
      (layer, index) => getUid(layer) === getUid(oldLayers[index])
    )
  );
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
import LayerRenderer from 'ol/renderer/Layer'; import { Source } from
'ol/source'; import LayerRenderer from 'ol/renderer/Layer'; import { Source }
from 'ol/source';
