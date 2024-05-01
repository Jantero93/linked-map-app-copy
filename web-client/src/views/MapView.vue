<template>
  <div class="map-wrapper">
    <GenericMapComponent
      :initial-view="{ center: [0, 0], zoom: 4 }"
      :layers="vectorLayers"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GenericMapComponent from '../components/GenericMapComponent.vue';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

// Example vector layer with one feature
const vectorLayers = ref([
  new VectorLayer({
    source: new VectorSource({
      features: [new Feature(new Point([0, 0]))]
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
