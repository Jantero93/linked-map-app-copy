<template>
  <div ref="mapContainer" class="h-100 w-100" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
// OL
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Layer from 'ol/layer/Layer';
import LayerRenderer from 'ol/renderer/Layer';
import { Source } from 'ol/source';
import { fromLonLat } from 'ol/proj';
// Helpers
import { areLayersEqual, isLayer } from '@/openlayers/openlayersUtilities';

type Props = {
  initialView: {
    center: { longitude: number; latitude: number };
    zoom: number;
  };
  layers: unknown[];
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
    const allLayers = newLayers.concat(oldLayers);

    // Check layer typing
    if (allLayers.some((l) => !isLayer(l))) {
      console.error('Layer typing has failed', allLayers);
      throw new Error(
        'Check layer typing, layer typing failed in MapComponent watch function'
      );
    }

    if (
      areLayersEqual(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        newLayers as Layer<Source, LayerRenderer<any>>[],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        oldLayers as Layer<Source, LayerRenderer<any>>[]
      )
    )
      return;

    // Remove old layers first & Re-add all new layers
    map?.getLayers().clear();
    newLayers.forEach((layer) => isLayer(layer) && map?.addLayer(layer));
  },
  //NOTE: Is 'deep' needed? Is areLayersEqual function needed or correct? Does this watch work as intended
  { deep: true }
);
</script>
