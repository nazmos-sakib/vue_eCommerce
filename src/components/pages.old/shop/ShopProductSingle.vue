<template>
	<div>
		<h1 class="fleft">{{fetchedData.product_name}}</h1>
    <router-link to="/shop/products" class='fright'> All Product </router-link>
    <div class="clear"></div>
		<hr>

    <div class="product-left">
      <img :src="serverUrl+fetchedData.product_image">
      <br>
      
    </div>
    <div class="product-right">
      <div class="product-description">
        <p>
          <strong>Category : </strong> {{fetchedData.category_name}} <br><br>
          <strong>Supplier : </strong> {{fetchedData.supplier_name}} <br><br>
          <strong>Price : </strong> {{fetchedData.product_price}} <br><br>
          <strong>Description : </strong> {{fetchedData.product_description}} <br><br>
        </p>
        <strong>Quatity: </strong>
        <input class="input-number" type="number" v-model="qnt">
        <button class="addBtn" @click="addToCart()">Add to Cart</button>
        
      </div>
      
    </div>
    <div class="clear"></div>
    <hr>
    <br><br><br>
    <p class="txt-center">
      <router-link class="addBtn" to="/shop/products"> Continue Shoping </router-link>
    </p>

		
	</div>
</template>

<script>
export default {
  name: 'ShopProductSingle',
  data () {
    return {
      productId: 0,
      qnt:1,
    	fetchedData: [],
    	sendData : {
        service_name: "",
        param:{},
      },
      serverUrl: "http://localhost/vue_eCommerce_api/",
    }
  },
  mounted() {
    this.productId = this.$route.params.p_id;
    //console.log(this.productId);
    this.fetchSingle();
  },
  methods: {

    fetchSingle(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "getSingleProduct";
      this.sendData.param.pid = this.productId;
      //console.log(JSON.stringify(this.sendData));
      this.$axios.post("http://localhost/vue_eCommerce_api/", JSON.stringify(this.sendData),{headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem("token"),}})
      .then(res=>{
        //console.log(res);
        appThis.$eventBus.$emit("loadingStatus",false);
        if(res.data.response.error){
          appThis.$iziToast.error({
              title: 'Error',
              message: res.data.response.message ,
          });
        } else {
          appThis.showingAddModel = false;
          appThis.fetchedData = res.data.response.message;
        }
      });
    },

    addToCart(){
      this.$eventBus.$emit("addToCart",{product: this.fetchedData, quatity: this.qnt});
    },
    
 

  }
}
</script>

</style>
