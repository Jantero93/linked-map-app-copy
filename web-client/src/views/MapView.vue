<template>
  <div class="map-wrapper">
    <OpenLayersMap :initial-view="tampereCoordinates" :layers="vectorLayers" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Components
import OpenLayersMap from '@/openlayers/OpenLayersMap.vue';
// Map
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { getCityCoordinates } from '@/openlayers/openlayersConstants';

const { latitude, longitude } = getCityCoordinates('tampere');

const tampereCoordinates = ref({
  center: { latitude, longitude },
  zoom: 13
});

const vectorLayers = ref([
  new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point([longitude, latitude])
        })
      ]
    })
  })
]);
</script>

<style>
.map-wrapper {
  height: 100vh;
  width: 100vw;
}
</style>
