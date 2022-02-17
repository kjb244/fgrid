import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
  },
  getters: {



  },
  mutations: {


  },
  actions: {

    testAjaxGet: function(){
        return axios.get('http://jsonplaceholder.typicode.com/posts');
    }
  }

})
