<template>
  <div ref="mapRef" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, Ref, ref } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const mapRef: Ref<HTMLElement> = ref() as Ref<HTMLElement>;
let map: Map | null = null;

onMounted(() => {
  map = new Map({
    target: mapRef.value,
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [0, 0],
      zoom: 2
    })
  });
});

onUnmounted(() => {
  map?.setTarget(undefined);
});
</script>

<style scoped>
.map-container {
  height: 400px;
  width: 100%;
}
</style>
