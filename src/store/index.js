import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'
Vue.use(Vuex)
import { setStore } from '@/utils/storage'
export default new Vuex.Store({
  state: {
    login: false,//是否登录
    userInfo: {
      username:'',
      avatar:''
    }, // 用户信息
    carList: [], //加入购物车商品
    showCar: false,
    searchList: [] //搜索商品列表
  },
  mutations: {
    SHOWCAR(state, { showCar }) {
      state.showCar = showCar;
    },

    ISLOGIN(state, info) {
      state.userInfo = info;
      state.login = true;
      setStore('userInfo', info);
    },

    SEARCHLIST(state, { searchGoods }) {
      state.searchList = searchGoods;
    },


    GETCARLIST(state, data) {
      state.carList = data
    }
  },
  actions: {
    //获取购物车列表数据
    async getCarList({ commit }) {
      let res = await http.get("/carList");
      commit('GETCARLIST', res.data?.carList)
    },

    //删除购物车商品数据
    async deleteCarListById({ commit }, id) {
      await http.delete(`/deleteGoods/${id}`);
    },

    //修改购物车商品的数量
    async updateCarListNum({ commit }, data) {
      await http.put("/addCar", data);
    },

    //添加商品到购物车
    async addItemToCarList({ commit }, data) {
      await http.post('/addCar', data)
    }

  },
  modules: {
  }
})
