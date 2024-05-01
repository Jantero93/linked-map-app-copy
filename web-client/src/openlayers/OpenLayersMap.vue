<template>
  <div ref="mapContainer" class="map-container" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
// OL
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
// Helpers
import { areLayersEqual, isLayer } from '@/openlayers/openlayersUtilities';

type Props = {
  initialView: {
    center: { longitude: number; latitude: number };
    zoom: number;
  };
  layers: any[];
};

const props = defineProps<Props>();
const mapContainer = ref<HTMLElement | null>(null);
let map: Map | null = null;

onMounted(() => {
  if (mapContainer.value === null) return;

  map = new Map({
    target: mapContainer.value,
    layers: [new TileLayer({ source: new OSM() })],
    view: new View({
      center: fromLonLat([
        props.initialView.center.longitude,
        props.initialView.center.latitude
      ]),
      zoom: props.initialView.zoom
    })
  });

  props.layers.forEach((layer) => isLayer(layer) && map?.addLayer(layer));

  // Resize map by container size
  new ResizeObserver(() => map?.updateSize()).observe(mapContainer.value);
});

onUnmounted(() => {
  map?.getLayers().clear();
  map?.setTarget(undefined);
});

// Watch for changes in the layers
watch(
  () => props.layers,
  (newLayers, oldLayers) => {
    if (areLayersEqual(newLayers, oldLayers)) return;

    // Remove old layers first & Re-add all new layers
    map?.getLayers().clear();
    newLayers.forEach((layer) => map?.addLayer(layer));
  },
  { deep: true } //NOTE: Is this needed? Is areLayersEqual function needed or correct? Does this watch work as intended
);

// Helper functions
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
