<template>
	<div>
		<h1>Latest Products</h1>
		<hr>
		<div class="product" v-for="product in fetchedData" :key="product.id">
			<router-link	:to="'/shop/ShopProductSingle/' + product.product_id">
				<div class="productContainer">
					<img :src="serverUrl+product.product_image" alt="Image not found" class="icon">				
					<br><br>
					<strong>{{product.product_name}}</strong>
					<p class="price">&#2547; {{product.product_price}}</p>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
  name: 'ShopProduct',
  data () {
    return {
    	fetchedData: [],
    	sendData : {
        service_name: "",
        param:{},
      },
      serverUrl: "http://localhost/vue_eCommerce_api/",
    }
  },
  mounted() {
    this.fetchAllProduct();
  },
  methods: {

    fetchAllProduct(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "getAllProduct";
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
    
   

  }
}
</script>

</style>
