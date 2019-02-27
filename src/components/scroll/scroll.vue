<template>
  <div class="scroll-container" :style="{height:`${height}px`}" ref="container"  @scroll.native="scrollHandler">
    <div class="scroll-content" :style="{transform:`translateY(${contentTop}px)`}" ref="content">
      <slot>

      </slot>
    </div>
    <div class="scroll-controller" @click="clickControllerHandler">
      <div class="scroll-control" ref="control" :style="{transform:`translateY(${controlTop}px)`,height:`${controlheight}px`}" @mousedown="startHandler" >
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name:'scroll',
  data(){
    return {
      contentTop:0,
      controlheight:0,
      totalHeight: 0,
      controlMove: 0,
      startPosition: 0,
    }
  },
  props: {
    height: {
      type: Number,
    },
    move: {
      default: 20,
    }
  },
  computed:{
    controlTop(){
      return - this.contentTop * this.controlMove;
    },
    moveHeight(){
      return  this.height - this.totalHeight;
    }
  },
  mounted() {
    let that = this;
    that.totalHeight = that.$refs.content.scrollHeight;
    that.controlheight = that.height * that.height / that.totalHeight;
    that.controlMove = this.height / this.totalHeight;
    const container = that.$refs.container;
    container.addEventListener('mousewheel', event => {
      that.scrollHandler(event);
    });

  },
  methods: {
    scrollHandler(event) {
      event.stopPropagation();
      event.preventDefault();
      if(event.wheelDelta > 0){
        this.contentTop += this.move;
        if(this.contentTop > 0){
          this.contentTop = 0;
        }
      } else{
        if(this.contentTop > this.moveHeight ){
          this.contentTop -= this.move;
        }
      }
    },
    moseoverHandler(event){
      console.log(event);
      const move = event.offsetY - this.startPosition;
      this.contentTop -= move / this.controlMove;
      if(this.contentTop < this.moveHeight){
        this.contentTop = this.moveHeight
      }
      if(this.contentTop > 0){
        this.contentTop = 0;
      }
      this.startPosition = event.offsetY;
    },
    startHandler(event){
      // let that = this;
      // that.startPosition = event.offsetY;
      // document.addEventListener('mousemove', that.moseoverHandler(event));
      // document.addEventListener('mouseup', event => {
      //   document.removeEventListener('mousemove', that.moseoverHandler(event));
      // });
    },
    endHandler(event){
      const move = event.offsetY - this.startPosition;
      this.contentTop -= move / this.controlMove;
      if(this.contentTop < this.moveHeight){
        this.contentTop = this.moveHeight
      }
      if(this.contentTop > 0){
        this.contentTop = 0;
      }
    },
    clickControllerHandler(event){
      const { offsetY,target } = event;
      if(target === this.$refs.control){
        return;
      }
      if(offsetY > this.controlTop + this.controlheight){
        this.contentTop -= this.move* 5;
        if(this.contentTop < this.moveHeight){
          this.contentTop = this.moveHeight;
        }
      }
      if(offsetY  < this.controlTop){
        this.contentTop += this.move* 5;
        if(this.contentTop > 0){
          this.contentTop = 0;
        }
      }
    }
  }
}
</script>
<style>
.scroll-container{
  overflow: hidden;
  display: flex;
}
.scroll-content{
  position: relative;
  float:left;
  transition: transform .2s;
  flex: 1;
}
.scroll-controller{
  width:10px;
  float:left;
}
.scroll-control{
  transition: transform .2s;
  background: #b1b5b5;
  border-radius: 15px;
}
</style>
