<template>
	<div>
		<h1 class="fleft"> Delivery Information</h1>
		<router-link to="/shop/products" class="fright">All Products</router-link>
		<div class="clear"></div>
		<hr>
		<table>
			<tr>
				<td>
					Full Name
				</td>
				<td>
					<input type="text" placeholder="Fullname" name="">
				</td>
			</tr>
			<tr>
				<td>
					city
				</td>
				<td>
					<select>
						<option value="">--Select One--</option>
						<option value="">Dhaka</option>
						<option value="">Rajshahi</option>
						<option value="">Khulna</option>
						<option value="">Barishal</option>
						<option value="">Rangpur</option>
						<option value="">Sylet</option>
						<option value="">Chitagong</option>
					</select>
				</td>
			</tr>
			<tr>
				<td>
					Address
				</td>
				<td>
					<textarea placeholder="Write Delivery Description"></textarea>
				</td>
			</tr>
			<tr>
				<td>Mobile</td>
				<td>
					<input type="text" placeholder="Mobile Number" name="">
				</td>				
			</tr>
			<tr>
				<td>
					Payment Method
				</td>
				<td>
					<select>
						<option value="">--Select One--</option>
						<option value="">Cash On Delivery</option>
						<option value="">Nagad</option>
						<option value="">Sur Cash</option>
						<option value="">Paypal</option>
						<option value="">Master Card</option>
					</select>
				</td>
			</tr>

			<tr>
				<td></td>
				<td>
					<button class="btnSave" @click="orderNow()">Order Now</button>
				</td>
			</tr>

		</table>
	</div>
</template>


<script type="text/javascript">
	
	export default {
		name: "checkout",
		data(){
			return{
				msg: 'shop',
				sendData : {
			        service_name: "",
			        param:{},
			      },
			}
		},

		mounted(){
			this.init();
		},

		methods: {
			init(){

			},

			orderNow(){
				this.$eventBus.$emit("loadingStatus",true);
				var appThis = this;
				this.sendData.service_name = "placeOrder";
				this.$axios.post("http://localhost/vue_eCommerce_api/", JSON.stringify(this.sendData),{headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem("token"),}})
				.then(res=>{
				console.log(res);
				appThis.$eventBus.$emit("loadingStatus",false);
				if(res.data.response.error){
				  appThis.$iziToast.error({
				      title: 'Error',
				      message: res.data.response.message ,
				  });
				} else {
					appThis.$eventBus.$emit("clearCart");
					  //appThis.fetchedData = res.data.response.message;
					  appThis.$iziToast.success({
					      title: 'Success',
					      message: res.data.response.message ,
					  });

					  appThis.$router.push({path:'/shop/products'});
					}
				});
			},
		},
	}






</script>