import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);


const store = new Vuex.Store({
	state: {
		count: 0,
		appName: 'simple e commarce',
		cart:[],
	},

	getters:{
		getAppName: state=>{
			return state.appName;
		},

		getCart: state=>{
			return state.cart;
		},
	},

	mutations: {
		addToCart(state, payload){
			if (!state.cart.some(elem => elem.product.product_id === payload.product.product_id)) {
				state.cart.push(payload);
			}
			//state.cart.push(payload);
		},

		removeCartItem(state, payload){
			state.cart.splice(payload,1);
		}
	},

	actions:{

	},

	plugins: [createPersistedState()]
});

export default store;