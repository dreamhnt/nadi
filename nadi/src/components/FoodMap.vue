<template>
  <div class="map_wrap">
    <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
    <place-list></place-list>
  </div>
</template>

<script>
import PlaceList from './placeList'

export default {
  name: 'FoodMap',
  data () {
    return {
      map: null,
      ps: null,
      infowindow: null
    }
  },
  components: { PlaceList },
  mounted () {
    // this.getCurrentPosition()
    //   .then(position => {
    //     const mapContainer = document.getElementById('map') // 지도를 표시할 div
    //     const mapOption = {
    //       center: position, // 지도의 중심좌표
    //       level: 3 // 지도의 확대 레벨
    //     }
    //     this.map = new window.daum.maps.Map(mapContainer, mapOption) // 지도 생성
    //   })
    const mapContainer = document.getElementById('map') // 지도를 표시할 div
    const mapOption = {
      center: new window.daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    }
    this.map = new window.daum.maps.Map(mapContainer, mapOption) // 지도 생성
    this.infowindow = new window.daum.maps.InfoWindow({zIndex: 1})  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표시할 인포윈도우
  },
  methods: {
    getCurrentPosition () {
      return new Promise((resolve, reject) => {
        let locPosition = null
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
        if (navigator.geolocation) {
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(position => {
            const coords = position.coords
            locPosition = new window.daum.maps.LatLng(coords.latitude, coords.longitude) // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다. 위도,경도
            resolve(locPosition)
          })
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          locPosition = new window.daum.maps.LatLng(33.450701, 126.570667)
          resolve(locPosition)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
.map_wrap {position:relative;width:100%;height:500px;}
</style>
