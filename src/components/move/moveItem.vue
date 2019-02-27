<template slot-scope="item">
  <div class="move-item"  :style="{width:`${width}px`}" v-if="flag">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'moveItem',
  data() {
    return {
      flag: null,
    };
  },
  mounted(){},
  props: ['width'],
};
</script>

<style>
.move-item{
  float: left;
  height: 100%;

}
</style>
