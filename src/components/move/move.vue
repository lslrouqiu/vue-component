<template>
  <div class="move-wrap" :style="{width: `${this.wrapWidth}px`,height: `${this.height}px`}" ref="moveParent">
    <div class="move-main" :style="{width:mainWidth,transform:`translateX(${translate}px)`}">
      <slot></slot>
    </div>
    <div class="move-btn">
      <div class="move-arrow left" :class="leftArrow" @click="prevClick"></div>
      <div class="move-arrow right" :class="rightArrow"  @click="nextClick"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'move',
  data() {
    return {
      mainWidth: '0px',
      translate: 0,
      activeIndex: 0,
      lastIndex: 0,
      firstIndex: 0,
      leftArrow: 'disabled',
      rightArrow: 'abled',
      showFlag: [],
      wrapWidth: null,
      innerWidth: 0,
    };
  },
  props: {
    width: {
      required: false
    },
    height:{
      default: 300
    },
  },
  mounted() {
    let _this = this;
    _this.wrapWidth = _this.width || _this.$el.parentNode.offsetWidth;
    _this.lastIndex = _this.$children.length - 1;
    _this.innerWidth = _this.$children[0].width;
    _this.mainWidth = `${(_this.lastIndex + 1) * _this.innerWidth}px`;
    _this.activeIndex = _this.firstIndex = Math.floor(_this.wrapWidth/_this.innerWidth) - 1;
    _this.showFlag = new Array(_this.firstIndex + 1).fill(false).concat(new Array(_this.lastIndex - _this.firstIndex).fill(false));

    this.$children.map((child, index) => {
      child.flag = index <= _this.firstIndex;
    });

  },
  methods: {
    prevClick() {
      if (this.activeIndex === this.firstIndex) {
        return;
      }
      if (this.activeIndex === this.lastIndex) {
        this.rightArrow = 'abled';
      }
      this.activeIndex -= 1;
      this.translate += parseInt(this.innerWidth, 10);
      if (!this.showFlag[this.activeIndex]) {
        this.$children[this.activeIndex].flag = true;
        this.showFlag[this.activeIndex] = true;
      }
      if (this.activeIndex === this.firstIndex) {
        this.leftArrow = 'disabled';
      }
    },
    nextClick() {
      if (this.activeIndex === this.lastIndex) {
        return;
      }
      if (this.activeIndex === this.firstIndex) {
        this.leftArrow = 'abled';
      }
      this.activeIndex += 1;
      this.translate -= this.innerWidth;
      if (!this.showFlag[this.activeIndex]) {
        this.$children[this.activeIndex].flag = true;
        this.showFlag[this.activeIndex] = true;
      }
      if (this.activeIndex === this.lastIndex) {
        this.rightArrow = 'disabled';
      }
    },
  },
};
</script>

<style>
.move-wrap{
  position: relative;
  overflow: hidden;
}
.move-wrap:hover .move-arrow{
  display: block;
}
.move-main{
  height: 100%;
  transition: transform 500ms;
  -moz-transition: transform 500ms;
  -webkit-transition: transform 500ms;
  -o-transition: transform 500ms;
}
.move-arrow{
  display: none;
  position: absolute;
  top: 50%;
  margin-top: -19px;
  width: 38px;
  height: 38px;
  background-image: url('https://i.h2.pdim.gs/29e3c5fbb3e0f71f9b66733c3d0408f0.png')
}
.right{
  right: 0px;
}
.left.abled{
  cursor: pointer;
  background-position: -10px -10px;
}
.left.abled:hover{
  background-position: -10px -68px;
}
.right.abled{
  cursor: pointer;
  background-position: -10px -184px;
}
.right.abled:hover{
  background-position: -10px -242px;
}
.left.disabled{
  background-position: -10px -126px;
}
.right.disabled{
  background-position: -10px -300px;
}
</style>
