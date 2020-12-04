<template>
      <div id="cartContainer">
        <h2>Your cart</h2>      
        <hr>
        <table id="" class="cart">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>price</th>
            <th> Remove </th>
          </tr>
          <tr v-for="(item,index) in cart">
            <td> {{item.product.product_name}} </td>
            <td> <input type="number" class="input-number" v-model="item.quatity"> </td>
            <td> &#2547; {{item.product.product_price * item.quatity}} </td>
            <td><button @click="removeCartItem(index)"> X </button></td>
          </tr>
          <tr>
            <td class="4">
              <hr>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>Total = </td>
            <td> &#2547; {{total}}</td>
          </tr>
        </table>
        <br><br>
        <p class="txt-center">
          <router-link to="/shop/checkout" class="addBtn">Checkout</router-link>
        </p>
      </div>
</template>

<script type="text/javascript">
	

export default {
  name: 'Cart',
  data(){
  	return{
  		cart:[],
  		//total:0,
  	}
  },
  computed:{
  	myAppName(){
  		return this.$store.getters.getAppname;
  	},

  	getCartData(){
  		//return this.$store.getters.getCart;
  		this.cart = this.$store.getters.getCart;
  	},

  	total(){
      var total = 0;
      for(var i=0; i<this.cart.length;i++){
        var item = this.cart[i];
        total = total + item.quatity * item.product.product_price;
      }
      return total;
    },
  },
  methods:{
  	removeCartItem(index){
  		this.$store.commit('removeCartItem', index);
  	},
  },
  mounted(){
  	this.getCartData;
  }
}

</script>