<template>
  <div class="map_wrap">
    <div id="map" style="width:100%;height:100%;position:relative;overflow:hidden;"></div>
    <place-list @closeInfoWindow="closeInfoWindow" @displayPlaces="displayPlaces" @displayInfoWindow="displayInfowindow" @showModal="showModal"></place-list>
    <Modal
      class="createModal"
      v-model="displayModal"
      title="상세정보입력"
      width="300"
      @on-ok="saveModal"
      @on-cancel="displayModal=false">
        <div slot="header">
          <p>{{ this.modalData.title }}</p>
        </div>
        <div>
          <photo-upload></photo-upload>
          <Input v-model="modalData.description" placeholder="한줄평"></Input>
          <p class="rate">
            <span>매운맛</span>
            <Rate allow-half v-model="modalData.hot"></Rate>
          </p>
          <p class="rate">
            <span>청결함</span>
            <Rate allow-half v-model="modalData.clean"></Rate>
          </p>
          <p class="rate">
            <span>화장실</span>
            <Rate allow-half v-model="modalData.toilet"></Rate>
          </p>
          <p class="rate">
            <span>총점</span>
            <Rate allow-half v-model="modalData.total"></Rate>
          </p>
          <Input v-model="tagText" placeholder="태그입력" @keyup.native.enter="pushTag" style="margin-top:10px"></Input>
          <div style="margin-top:10px">
            <Tag type="border" v-for="tag in modalData.tags" :key="tag" :name="tag" closable @on-close="popTag">{{ tag }}</Tag>
          </div>
        </div>
        <div slot="footer">
            <Button type="text" @click="displayModal=false">취소</Button>
            <Button type="primary">저장</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import PlaceList from './placeList'
import PhotoUpload from './photoUpload'

export default {
  name: 'foodMap',
  data () {
    return {
      map: null,
      ps: null,
      infowindow: null,
      markers: [],

      // 모달 정보
      displayModal: false,
      tagText: '',
      modalData: {
        title: '',
        description: '',
        total: 0,
        hot: 0,
        clean: 0,
        toilet: 0,
        tags: []
      }
    }
  },
  components: { PlaceList, PhotoUpload },
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
    showModal (place) {
      this.displayModal = true
      this.modalData.title = place.place_name
    },
    saveModal () {

    },
    pushTag () {
      this.modalData.tags.push(this.tagText)
      this.tagText = ''
    },
    popTag (event, tag) {
      const index = this.modalData.tags.indexOf(tag)
      this.modalData.tags.splice(index, 1)
    },
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
    },
    displayPlaces (places) {
      const bounds = new window.daum.maps.LatLngBounds()
      // 검색 결과 목록에 추가된 항목들을 제거합니다
      // removeAllChildNods(listEl);

      // 지도에 표시되고 있는 마커를 제거합니다
      // removeMarker();
      places.forEach((p, i) => {
        const placePosition = new window.daum.maps.LatLng(places[i].y, places[i].x)
        const marker = this.addMarker(placePosition, places[i].id)
        bounds.extend(placePosition)

        window.daum.maps.event.addListener(marker, 'mouseover', _ => {
          this.displayInfowindow(places[i].id, places[i].place_name)
        })

        window.daum.maps.event.addListener(marker, 'mouseout', _ => {
          this.infowindow.close()
        })
      })
      this.map.setBounds(bounds)
    },
    addMarker (position, placeId) {
      // const imgSrc = require('../assets/marker.png')
      // const imgSize = new window.daum.maps.Size(36, 37)
      // const markerImage = new window.daum.maps.MarkerImage(imgSrc, imgSize)

      // 마커를 생성합니다
      var marker = new window.daum.maps.Marker({
        position: position
        // image: markerImage
      })

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map)
      this.markers.push({
        marker: marker,
        id: placeId
      })

      return marker

      // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
      // marker.setMap(null)
    },
    displayInfowindow (placeId, title) {
      const content = '<div style="padding:5px;z-index:1;">' + title + '</div>'
      const obj = this.markers.find(m => m.id === placeId)

      this.infowindow.setContent(content)
      this.infowindow.open(this.map, obj.marker)
    },
    closeInfoWindow () {
      this.infowindow.close()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map_wrap, .map_wrap * {margin:0;padding:0;font-family:'Malgun Gothic',dotum,'돋움',sans-serif;font-size:12px;}
.map_wrap a, .map_wrap a:hover, .map_wrap a:active{color:#000;text-decoration: none;}
.map_wrap {position:relative;width:100%;height:700px}

.createModal .rate {
  margin-top: 10px;
  padding: 5px;
}
.createModal .rate .ivu-rate {
  font-size: 15px;
  float: right;
}
</style>
