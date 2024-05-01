<!-- MapView.vue -->
<template>
  <v-container fluid class="fill-height pa-0 ma-0">
    <v-row class="fill-height" no-gutters>
      <v-col cols="3" class="control-panel pa-0 ma-0 fill-height">
        <ControlPanelMapView />
      </v-col>
      <v-col cols="9" class="pa-0 ma-0 fill-height map-wrapper">
        <OpenLayersMap
          :initial-view="tampereCoordinates"
          :layers="vectorLayers"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Map
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { getCityCoordinates } from '@/openlayers/openlayersConstants';
// Components
import OpenLayersMap from '@/openlayers/OpenLayersMap.vue';
import ControlPanelMapView from '@/components/ControlPanelMapView.vue';

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
