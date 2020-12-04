<template>
  <div class="admin">
    <div id = "header">
      <h1 class="fleft">Admin Panel</h1>
      <router-link to="/admin" class="fright"> Dashboard</router-link>
      
    </div>

    <div id="shop">
      <div id="shopContainer">
        <router-view/>
        
      </div>
      
    </div>

  <div id= "cart" >   
    <Cart />
  </div>
    
    

  </div>
</template>

<script>

import Cart from "../../others/Cart.vue"

export default {
  name: 'Shop',
  data () {
    return {
      sendData : {
        service_name: "verifyToken",
        "param" : {}
      },
      cart:[],
      quatity: 1,
    }
  },
  computed:{
    total(){
      var total = 0;
      for(var i=0; i<this.cart.length;i++){
        var item = this.cart[i];
        total = total + item.quatity * item.product.product_price;
      }
      return total;
    },
  },
  mounted()
  {
    this.varifyToken();
    this.$eventBus.$on("addToCart",payload=>{
      //console.log(payload.product);
      if (!this.cart.some(elem => elem.product.product_id === payload.product.product_id)) {
        this.cart.push(payload);
      }
      //this.cart.push(payload);
    });

    this.$eventBus.$on("clearCart",payload=>{
      this.cart=[];
    });
  },
  methods: {
    logoutNow(){
      localStorage.setItem("token","");
      this.$router.push({name: "login"});
    },

    varifyToken(){
      
      var token = localStorage.getItem("token");
      //console.log("token: "+token);
      if(token == ""){
        this.$router.push({name: "login"});
        this.$iziToast.error({
          title: 'Error',
          message: "please login to view content" ,
        });
      }
      else
      {
        this.$eventBus.$emit("loadingStatus",true);
        var appThis = this;
        this.$axios.post("http://localhost/vue_eCommerce_api/", tokenParam,{headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem("token"),}})
        .then(res=>{
          //console.log(res);
          appThis.$eventBus.$emit("loadingStatus",false);
          if(res.data.response.error){
            appThis.$iziToast.error({
                title: 'Error',
                message: res.data.response.message ,
            });
            appThis.logoutNow();
          }
        });
      }
    },


  },

  components:{
    Cart
  },

  
}
</script>
