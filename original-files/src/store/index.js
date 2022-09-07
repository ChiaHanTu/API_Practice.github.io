import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    markers: [],
  },
  getters: {
    getMarkers: (state) => state.markers,
  },
  mutations: {
    addMarkers(state, data) {
      state.markers = data;
    },
  },
  actions: {
    loadMarkers({ commit }) {
      fetch('https://raw.githubusercontent.com/andyanasystem/getJSON/main/response.json')
        .then((res) => res.json())
        .then((data) => {
          const mapData = [];
          const mapInfo = data.features.map((item) => item.properties);
          const coordinate = data.features.map((item) => item.geometry.coordinates);

          for (let i = 0; i < data.features.length; i += 1) {
            const servicePeriod = mapInfo[i].available.split('、');
            // 資料重構
            const serviceDay = (day) => servicePeriod.filter((item) => item.match(day));
            const serviceTime = (day) => serviceDay(day).map((item) => `&nbsp&nbsp${item.slice(3)}`);
            mapData[i] = {
              position: {
                lat: coordinate[i][1], lng: coordinate[i][0],
              },
              infoText: `<h3>${mapInfo[i].name}</h3>
                        <p>電話: ${mapInfo[i].phone}</p>
                        <p>地區: ${mapInfo[i].county}${mapInfo[i].town}${mapInfo[i].cunli}</p>
                        <p>地址: ${mapInfo[i].address}</p>
                        <p>成人口罩: ${mapInfo[i].mask_adult}個</p>
                        <p>兒童口罩: ${mapInfo[i].mask_child}個</p>
                        <p>更新時間: ${mapInfo[i].updated}</p>
                        <h4>看診時間:</h4>
                        <p>星期一: ${serviceTime('星期一')}</p>
                        <p>星期二: ${serviceTime('星期二')}</p>
                        <p>星期三: ${serviceTime('星期三')}</p>
                        <p>星期四: ${serviceTime('星期四')}</p>
                        <p>星期五: ${serviceTime('星期五')}</p>
                        <p>星期六: ${serviceTime('星期六')}</p>
                        <p>星期日: ${serviceTime('星期日')}</p>
                        <span>--------</span>
                        <p>備註: ${mapInfo[i].note}, ${mapInfo[i].custom_note}</p>
                        <p>網站: ${mapInfo[i].website}</p>`,
            };
          }
          commit('addMarkers', mapData.slice(0, 32));
        });
    },
  },
});
