<template>
  <div>
    <Menu mode="horizontal" active-name="1">
      <MenuItem name="1">
          <Icon type="map"></Icon>
          맛집
      </MenuItem>
    </Menu>
    <div class="main-container">
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'layout'
}
</script>

<style>
.main-container {
  padding: 20px
}
</style>
