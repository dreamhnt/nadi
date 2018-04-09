<template>
  <div id="menu_wrap">
    <keyword @search="search"></keyword>
    <div class="list" v-infinite-scroll="loadMore">
      <at-card v-for="p in placeList" :key="p.id">
        <h4 slot="title">{{ p.place_name }}</h4>
        <div>
          Card Content
        </div>
      </at-card>
    </div>
  </div>
</template>

<script>
import Keyword from './keyword'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'PlaceList',
  data () {
    return {
      placeList: [],
      pagination: null
    }
  },
  components: { Keyword },
  directives: { infiniteScroll },
  methods: {
    search ({ data, pagination }) {
      this.pagination = pagination
      if (pagination.current === 1) {
        this.placeList = data
      } else {
        this.placeList = this.placeList.concat(data)
      }
    },
    loadMore () {
      if (this.pagination && this.pagination.hasNextPage) {
        this.pagination.nextPage()
      }
    }
  }
}
</script>

<style>
#menu_wrap {position:absolute;top:0;left:0;bottom:0;width:250px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
.list .at-card {
  width: 100%;
  margin-top: 10px;
}
.list .at-card .at-card__head {
  text-align: left;
}


</style>
