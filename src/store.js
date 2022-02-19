import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {

    getFruits: function(){
        return new Promise((resolve) =>{
          const fruitArr = [
              {name: 'Apple', icon: 'https://img.icons8.com/doodle/18/000000/apple.png'},
              {name: 'Banana', icon: 'https://img.icons8.com/color/18/000000/banana.png'},
              {name: 'Blueberry', icon: 'https://img.icons8.com/color/18/000000/blueberry.png'},
              {name: 'Mango', icon: 'https://img.icons8.com/fluency/18/000000/mango.png'},
          ];
          //simulate server call with timeout
          setTimeout(() =>{
              resolve(fruitArr);
          },200)

        })
    }
  }

})
