<template>
  <div id="menu_wrap">
    <keyword @search="search"></keyword>
    <div class="list" v-infinite-scroll="loadMore">
      <at-card v-for="p in placeList" :key="p.id">
        <h4 slot="title">{{ p.place_name }}
          <a :href="p.place_url" target="_blank">
            <i class="icon icon-external-link"></i>
          </a>
        </h4>
        <div>
          <p class="category">{{ p.category_name }}</p>
          <p class="addr">{{ p.address_name }}</p>
          <p><a :href="`tel:${p.phone}`">{{ p.phone }}</a></p>
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
      console.log(data[0])
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
#menu_wrap .list .at-card {
  width: 100%;
  margin-top: 5px;
  background:rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(136, 129, 129, 0.3);
}
#menu_wrap .list .at-card .at-card__body {
  padding: 12px 24px;
}
#menu_wrap .list .at-card .at-card__body p {
  text-align: left;
  font-size: 12px;
  margin-bottom: 5px;
}

#menu_wrap .list .at-card .at-card__body a {
  color: #13ce66;
}
#menu_wrap .list .at-card .at-card__body .category {
  font-size: 11px;
}


</style>
