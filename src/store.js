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
              {name: 'Apple', icon: 'https://img.icons8.com/ios/20/000000/apple.png'},
              {name: 'Bananna', icon: 'https://img.icons8.com/ios/20/000000/apple.png'},
              {name: 'Mango', icon: 'https://img.icons8.com/ios/20/000000/apple.png'},
          ];
          //simulate server call with timeout
          setTimeout(() =>{
              resolve(fruitArr);
          },200)

        })
    }
  }

})
