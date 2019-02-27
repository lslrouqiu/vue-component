import Vue from 'vue';
import {Carousel,CarouselItem,Move,MoveItem,Tabs,Tab,Collapse,CollapseItem,Tree,Modal,Page,Scroll,DatePicker} from './index.js';

Vue.prototype.$modal = Modal;
Vue.use(CarouselItem);
Vue.use(Carousel);
Vue.use(Move);
Vue.use(MoveItem);
Vue.use(Tabs);
Vue.use(Tab);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tree);
Vue.use(Page);
Vue.use(Scroll);
Vue.use(DatePicker);

new Vue({
  el: '#app',
  data() {
    return {
      items: ['black', 'red', 'yellow', 'blue'],
      items2: ['black', 'red', 'yellow', 'blue','brown','gray','pink','#999','#555','#666'],
      tree: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
    };
  },
  methods: {
    showModal() {
      this.$modal({
        cancelShow: false,
        confirmEvent: function(){
          alert('afsdafa');
          return true;
        },
        message: this.$createElement('h1', this.items)
      })
    },
    pageClick(i) {
      console.log(i);
    }
  }
});
