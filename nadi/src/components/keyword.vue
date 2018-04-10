<template>
<div>
  <Input v-model="keyword" placeholder="키워드" append-button @keyup.native.enter="searchPlaces">
    <Button slot="append" icon="ios-search" @click="searchPlaces"></Button>
  </Input>
</div>
</template>

<script>
export default {
  name: 'keyword',
  data () {
    return {
      ps: null,
      keyword: ''
    }
  },
  mounted () {
    this.ps = new window.daum.maps.services.Places() // 장소 검색 객체
  },
  methods: {
    searchPlaces () {
      if (!this.keyword.replace(/^\s+|\s+$/g, '')) {
        this.$Message.warning('키워드를 입력해주세요.')
      } else {
        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        this.ps.keywordSearch(this.keyword, this.placesSearchCB)
      }
    },

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB (data, status, pagination) {
      if (status === window.daum.maps.services.Status.OK) {
        this.$emit('search', { data, pagination })
      } else if (status === window.daum.maps.services.Status.ZERO_RESULT) {
        this.$Message.info('검색 결과가 존재하지 않습니다.')
      } else if (status === window.daum.maps.services.Status.ERROR) {
        this.$Message.error('오류가 발생했습니다.')
      }
    }
  }
}
</script>

<style>

</style>
