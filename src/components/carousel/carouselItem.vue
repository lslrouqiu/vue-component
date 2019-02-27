<template slot-scope="item">
  <div class="carousel-item"  :style="{width:`${width}px`}" v-if="flag">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'carouselItem',
  data() {
    return {
      width: 0,
      flag: null,
    };
  },
  mounted() {
    this.width = this.$parent.$el.clientWidth;
  },
};
</script>

<style>
.carousel-item{
  float: left;
  height: 100%;

}
</style>
