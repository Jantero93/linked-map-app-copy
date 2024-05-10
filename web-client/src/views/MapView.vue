<template>
  <v-container class="pa-0 ma-0" fluid>
    <v-row no-gutters>
      <v-col cols="3">
        <MapControllerPanel />
      </v-col>
      <v-col cols="9" class="map-wrapper">
        <OpenLayersMap :initial-view="initialView" :layers="vectorLayers" />
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
import { fromLonLat } from 'ol/proj';
import { getCityCoordinates } from '@/openlayers/openlayersConstants';
// Components
import OpenLayersMap from '@/components/map/OpenLayersMap.vue';
import MapControllerPanel from '@/components/map/MapControllerPanel.vue';

const cityCoordinates = getCityCoordinates('Tampere');

const initialView = ref({
  coordinates: cityCoordinates,
  zoom: 13
});

const vectorLayers = ref([
  new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(fromLonLat(cityCoordinates))
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
