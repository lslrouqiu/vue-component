// 插件开发的时候 这个是入口文件

import Carousel from './components/carousel/carousel.vue';
import CarouselItem from './components/carousel/carouselItem.vue';
import Move from './components/move/move.vue';
import MoveItem from './components/move/moveItem.vue';
import Tabs from './components/tabs/tabs.vue';
import Tab from './components/tabs/tab.vue';
import Modal from './components/modal/modal'
import Collapse from './components/collapse/collapse.vue';
import CollapseItem from './components/collapse/collapse-item.vue';
import Tree from './components/tree/tree.vue';
import Page from './components/page/page.vue';
import Scroll from './components/scroll/scroll.vue';
import DatePicker from './components/date/date.vue';

Carousel.install = function(Vue) {
  Vue.component(Carousel.name, Carousel);
};
CarouselItem.install =function(Vue) {
  Vue.component(CarouselItem.name, CarouselItem);
}
Move.install = function(Vue) {
  Vue.component(Move.name, Move);
};
MoveItem.install =function(Vue) {
  Vue.component(MoveItem.name, MoveItem);
}
Tabs.install = function(Vue) {
  Vue.component(Tabs.name, Tabs);
};
Tab.install =function(Vue) {
  Vue.component(Tab.name, Tab);
}
Collapse.install = function(Vue) {
  Vue.component(Collapse.name, Collapse);
};
CollapseItem.install =function(Vue) {
  Vue.component(CollapseItem.name, CollapseItem);
}
Tree.install = function(Vue){
  Vue.component(Tree.name,Tree);
}
Page.install = function(Vue){
  Vue.component(Page.name,Page);
}
Scroll.install = Vue => {
  Vue.component(Scroll.name,Scroll);
}
DatePicker.install = Vue => {
   Vue.component(DatePicker.name,DatePicker);
}
export {
  Carousel,
  CarouselItem,
  Move,
  MoveItem,
  Tabs,
  Tab,
  Modal,
  Collapse,
  CollapseItem,
  Tree,
  Page,
  Scroll,
  DatePicker,
}


