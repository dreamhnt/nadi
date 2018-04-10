<template>
  <div id="menu_wrap">
    <keyword @search="search"></keyword>
    <div class="list">
      <Scroll :on-reach-bottom="loadMore" loading-text="" height="600" style="margin-top:5px">
        <Card v-for="p in placeList" :key="p.id" @mouseover.native="mouseover(p)" @mouseout.native="mouseout" >
          <p slot="title">
            <a :href="p.place_url" target="_blank">
              <Icon type="link"></Icon>
            </a>
            {{ p.place_name }}
          </p>
          <a href="#" slot="extra" @click.prevent="showModal(p)">
            <Icon type="ios-plus-outline"></Icon>
          </a>
          <div>
            <p class="category">{{ p.category_name }}</p>
            <p class="addr">{{ p.address_name }}</p>
            <p><a :href="`tel:${p.phone}`">{{ p.phone }}</a></p>
          </div>
        </Card>
      </Scroll>
    </div>
  </div>
</template>

<script>
import Keyword from './keyword'

export default {
  name: 'placeList',
  data () {
    return {
      placeList: [],
      pagination: null
    }
  },
  components: { Keyword },
  methods: {
    search ({ data, pagination }) {
      console.log(data)
      this.pagination = pagination
      if (pagination.current === 1) {
        this.placeList = data
      } else {
        this.placeList = this.placeList.concat(data)
      }
      this.$emit('displayPlaces', data)
    },
    loadMore () {
      return new Promise(resolve => {
        if (this.pagination && this.pagination.hasNextPage) {
          this.pagination.nextPage()
        }
        resolve()
      })
    },
    mouseover (place) {
      this.$emit('displayInfoWindow', place.id, place.place_name)
    },
    mouseout () {
      this.$emit('closeInfoWindow')
    },
    showModal (place) {
      this.$emit('showModal', place)
    }
  }
}
</script>

<style>
#menu_wrap {position:absolute;top:0;left:0;bottom:0;width:300px;margin:10px 0 30px 10px;padding:5px;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px;}
#menu_wrap .list .ivu-card {
  width: 100%;
  margin-top: 5px;
  background:rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(136, 129, 129, 0.5);
}
#menu_wrap .list .ivu-card:hover {
  border: 1px solid rgba(136, 129, 129, 0.8);
}
#menu_wrap .list .ivu-card p {
  line-height: 22px;
  text-align: left;
}
#menu_wrap .list .ivu-card .ivu-card-head {
  padding-right: 32px;
}
#menu_wrap .list .ivu-card .ivu-card-head i {
  font-size: 16px;
}
#menu_wrap .list .ivu-card .ivu-card-extra i {
  font-size: 22px;
}
#menu_wrap .list .ivu-card .ivu-card-body p {
  font-size: 12px;
}

#menu_wrap .list .ivu-card .ivu-card-body a {
  color: #13ce66;
}
#menu_wrap .list .ivu-card .ivu-card-body .category {
  font-size: 11px;
}


</style>
