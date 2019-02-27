<template>
  <div class="carousel-wrap" :style="{width: `${this.wrapWidth}px`,height: `${this.height}px`}" ref="carouselParent">
    <div class="carousel-main" :style="{width:mainWidth,transform:`translateX(${translate}px)`,'padding-left':`${padding}px`}">
      <slot></slot>
    </div>
    <div class="carousel-btn">
      <div class="carousel-arrow left" :class="leftArrow" @click="prevClick"></div>
      <div class="carousel-arrow right" :class="rightArrow"  @click="nextClick"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'carousel',
  data() {
    return {
      mainWidth: '0px',
      translate: 0,
      activeIndex: 0,
      lastIndex: 0,
      leftArrow: 'disabled',
      rightArrow: 'abled',
      showFlag: [true],
      wrapWidth: null,
      padding: null,
    };
  },

  props: {
    width: {
      required: false
    },
    active: {
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
    _this.mainWidth = `${(_this.lastIndex + 1) * _this.wrapWidth}px`;
    if(_this.active && _this.active != 0) {
      const active = _this.active % (this.lastIndex + 1)
      _this.activeIndex = active;
      _this.showFlag = new Array(active).fill(false).concat([true],new Array(_this.lastIndex).fill(false));
      _this.padding = active * _this.wrapWidth;
      if(active > 0) {
        _this.leftArrow ='abled'
      }
      if(active === _this.lastIndex) {
        _this.rightArrow ='disabled'
      }
    } else {
      _this.showFlag = [true].concat(new Array(_this.lastIndex).fill(false));
    }
     _this.translate = -_this.activeIndex * _this.wrapWidth;
    this.$children.map((child, index) => {
      child.flag = index === _this.activeIndex;
    });
  },
  methods: {
    prevClick() {
      if (this.activeIndex === 0) {
        return;
      }
      if (this.activeIndex === this.lastIndex) {
        this.rightArrow = 'abled';
      }
      this.activeIndex -= 1;
      console.log(this.showFlag[this.activeIndex]);
      if (!this.showFlag[this.activeIndex]) {
        this.$children[this.activeIndex].flag = true;
        this.padding -= this.wrapWidth;
        this.showFlag[this.activeIndex] = true;
      }
      this.translate += parseInt(this.wrapWidth, 10);
      if (this.activeIndex === 0) {
        this.leftArrow = 'disabled';
      }
    },
    nextClick() {
      if (this.activeIndex === this.lastIndex) {
        return;
      }
      if (this.activeIndex === 0) {
        this.leftArrow = 'abled';
      }
      this.activeIndex += 1;
      this.translate -= this.wrapWidth;
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
.carousel-wrap{
  position: relative;
  overflow: hidden;
}
.carousel-wrap:hover .carousel-arrow{
  display: block;
}
.carousel-main{
  height: 100%;
  box-sizing: border-box;
  transition: transform 500ms;
  -moz-transition: transform 500ms;
  -webkit-transition: transform 500ms;
  -o-transition: transform 500ms;
}
.carousel-arrow{
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
