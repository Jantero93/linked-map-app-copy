<!-- MapView.vue -->
<template>
  <div class="map-wrapper">
    <v-container fluid class="fill-height pa-0 ma-0">
      <v-row class="fill-height" no-gutters>
        <v-col cols="3" class="control-panel pa-0 ma-0 fill-height">
          <v-card flat class="pa-2">
            <v-card-title>Control Panel</v-card-title>
            <v-card-text>
              <v-btn color="primary">Action 1</v-btn>
              <v-btn color="secondary">Action 2</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="9" class="pa-0 ma-0 fill-height">
          <OpenLayersMap
            :initial-view="tampereCoordinates"
            :layers="vectorLayers"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
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
