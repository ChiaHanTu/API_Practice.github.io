<template>
<div id="app" class="app">
  <h1>台北市松山區口罩存量地圖</h1>
    <gmap-map
        :center="{lat: 25.055, lng: 121.56}"
        :zoom="15"
        map-type-id="terrain"
        style="
          margin: auto;
          width: 1000px;
          height: 600px;
        "
    >
        <gmap-marker
            :key="index"
            v-for="(marker, index) in getMarkers"
            :position="marker.position"
            :clickable="true"
            :icon="iconUrl"
            @click="toggleInfoWindow(marker)"
        />
        <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen=false"
        />
        <gmap-polygon
            :paths="paths"
            :options="polygonOptions"
        />
    </gmap-map>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      infoWindowPos: null,
      infoWinOpen: false,
      infoOptions: {
        content: '',
        pixelOffset: {
          width: 0,
          height: -36,
        },
      },
      currentMapIndex: null,
      polygonOptions: {
        strokeColor: '#FFB057',
        strokeOpacity: '0.5',
        fillColor: '#E8A14F',
      },
      iconUrl: 'http://maps.google.com/mapfiles/ms/micons/hospitals.png',
    };
  },
  computed: {
    ...mapGetters([
      'getMarkers',
    ]),
    paths() {
      return this.getMarkers.slice(9, 13).map((item) => item.position);
    },
  },
  mounted() {
    this.loadMarkers();
  },
  methods: {
    ...mapActions([
      'loadMarkers',
    ]),
    toggleInfoWindow(marker) {
      this.infoWindowPos = marker.position;
      this.infoOptions.content = marker.infoText;
      this.infoWinOpen = !this.infoWinOpen;
    },
  },
};
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.app {
  height: 100%;

  h1 {
    margin: 30px auto;
    width: fit-content;
  }
}
</style>
