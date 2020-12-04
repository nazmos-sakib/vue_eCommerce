<template>
  <div >
    <model modelHeading="Add new Product" :cond = 'showingAddModel' @modelClose="showingAddModel = false; tempUrl='uploads/00.jpg'">
      

      <table>
        <tr>
          <td>Product Name</td>
          <td>
            <input type="text" id="newproddName" v-model="newProduct.product_name">
          </td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            <select v-model="newProduct.product_category_id">
              <option value="">--Select One--</option>
              <option v-for="row in allCategory" :value="row.category_id" :key="row.category_id" >{{row.category_name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Supplier</td>
          <td>
            <select v-model="newProduct.product_supplier_id">
              <option value="">--Select One--</option>
              <option v-for="row in allSupplier" :value="row.supplier_id" >{{row.supplier_name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Price</td>
          <td>
            <input type="text" v-model="newProduct.price">
          </td>
        </tr>
        <tr>
          <td>Image</td>
          <td>
            <input type="file" id="productImage" accept="image/*" @change="imageUploadTemp('productImage')">
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <progress :value="percent" max="100" v-if="percent != 0 && percent !==100"></progress>
            <span v-if="percent != 0 && percent !==100"></span><br><br>
            <img :src="serverUrl+tempUrl" alt="No Image selected" class="thumbnile">
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            <textarea type="text"v-model="newProduct.product_description" > </textarea>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="addNewProduct()">Add</button>
          </td>
        </tr>
      </table>


    </model>

    <!------------------update prodduct ------------->
    <model modelHeading="Update Product" :cond = 'showingEditModel' @modelClose="showingEditModel = false; tempUrl='uploads/00.jpg' ">
      

      <table>
        <tr>
          <td>Product Name</td>
          <td>
            <input type="text" id="newproddName" v-model="clickedprodd.product_name">
          </td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            <select v-model="clickedprodd.product_category_id">
              <option value="">--Select One--</option>
              <option v-for="row in allCategory" :value="row.category_id" :key="row.category_id" >{{row.category_name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Supplier</td>
          <td>
            <select v-model="clickedprodd.product_supplier_id">
              <option value="">--Select One--</option>
              <option v-for="row in allSupplier" :value="row.supplier_id" >{{row.supplier_name}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Price</td>
          <td>
            <input type="text" v-model="clickedprodd.product_price">
          </td>
        </tr>
        <tr>
          <td>Image</td>
          <td>
            <input type="file" id="updateProductImage" accept="image/*" @change="imageUploadTemp('updateProductImage')">
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <progress :value="percent" max="100" v-if="percent != 0 && percent !==100"></progress>
            <span v-if="percent != 0 && percent !==100"></span><br><br>
            <img :src="serverUrl+tempUrl" alt="No Image selected" class="thumbnile">
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            <textarea type="text"v-model="clickedprodd.product_description"> </textarea>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="updateProduct()">Update</button>
          </td>
        </tr>
      </table>


    </model>

    <!------------------delete prodduct ------------->
    <model modelHeading="Delete Product" :cond = 'showingDeleteModel' @modelClose="showingDeleteModel = false">
      
      <h2>Are you sure you want to delete this prodduct??</h2>
      <table>
        <tr>
          <td>Product Name: {{clickedprodd.product_name}}</td>
        </tr>
        
        <tr>
          <td>
            <button class="btnSave" @click="deleteProduct()">Yes</button>
          </td>
          <td>
            <button class="btnClose" @click="showingDeleteModel = false">No</button>
          </td>
        </tr>
      </table>


    </model>






    <h2 class="fleft"> Products</h2>
    <button class="addBtn fright" @click="showingAddModel = true">Add New</button>
    <div class="clear"></div>
    <hr>

    <table class="nice-table">
      <tr>
        <th>ID</th>
        <th>Image</th>
        <th>Name</th>
        <th>Description</th>
        <th>Category</th>
        <th>Supplier</th>
        <th>Price</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      <tr v-for="prod in fetchedData" :key="prod.id">
        <td>{{prod.product_id}}</td>
        <td><img :src="serverUrl+prod.product_image" alt="No Image selected" class="icon"></td>
        <td> {{prod.product_name}} </td>
        <td>{{prod.product_description}}</td>
        <td>{{prod.category_name}}</td>
        <td>{{prod.supplier_name}}</td>
        <td>{{prod.product_price}}</td>
        <td><button class="edit" @click="showingEditModel = true; clickedprodd = prod">Edit</button></td>
        <td><button class="delete" @click="showingDeleteModel = true; clickedprodd = prod">delete</button></td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  name: 'Product',
  data () {
    return {
      showingAddModel : false,
      showingEditModel : false,
      showingDeleteModel : false,

      newProduct:{
        product_name: "",
        product_description: "",
        product_category_id: "",
        product_supplier_id: "",
        price: 0,
        image: "",
      },
      service_name:[
        "getAllProduct",
        "addNewProduct",
        "updateProduct",
        "deleteProduct"
      ],
      sendData : {
        service_name: "",
        param:{}
      },
      fetchedData: [],
      clickedprodd: {},
      allCategory: [],
      allSupplier: [],
      serverUrl: "http://localhost/vue_eCommerce_api/",
      finishedImageUploaded: 0,
      imageApiReturnMessage:"",
      tempUrl: "uploads/00.jpg",
      uploadedUrl: "",
      percent: 0,
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
          return;
        } else {
          appThis.showingAddModel = false;
          appThis.fetchedData = res.data.response.message;
        }
      });


      ///getting all category in mounted time
      this.sendData.service_name = "getAllCategory";
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
          appThis.allCategory = res.data.response.message;
        }
      });

      ///getting all supplier in mounted time
      this.sendData.service_name = "getAllSupplier";
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
          appThis.allSupplier = res.data.response.message;
        }
      });
    },

    imageUploadTemp(id){
      var elm = document.getElementById(id);
      var appThis = this;
      var fd = new FormData();
      if (typeof elm.files[0] === 'undefined') {
            //console.log("before ");
            return {'error':true,"message":"select image"};
      }
      else{
        fd.append("fileToUpload",elm.files[0],elm.files[0].name);
        this.$axios.post("http://localhost/vue_eCommerce_api/api.image.php?tem=1",fd,{
            onUploadProgress(uploadEven){
              //console.log(Math.round((uploadEven.loaded/uploadEven.total)*100));
              appThis.finishedImageUploaded = Math.round((uploadEven.loaded/uploadEven.total)*100);
            }
          }).then(res=>{
            //console.log(res);
            if(res.data.response.error)
            {
              console.log("Upload image error");
              appThis.$iziToast.error({
                title: 'Error',
                message: res.data.response.message ,
                });
            }
            else
            {
              appThis.tempUrl = res.data.response.data;
              //console.log(appThis.tempUrl);
              appThis.imageApiReturnMessage = res.data.response.message;
              //console.log(appThis.imageApiReturnMessage);
            }
          });
      }
    },
    
    addNewProduct(){
      if (!this.newProduct.product_name) {
        this.$iziToast.error({
              title: 'Error',
              message: "Product name can not be empty" ,
          });
        document.getElementById("newproddName").focus();
        return;
      }
      var _this = this;
      _this.$eventBus.$emit("loadingStatus",true);

      let p = new Promise((resolve, reject)=>{
        var elm = document.getElementById("productImage");
        var fd = new FormData();
        if (typeof elm.files[0] === 'undefined') {
              //console.log("before ");
              reject(false);
        }
        else{
          fd.append("fileToUpload",elm.files[0],elm.files[0].name);
          _this.$axios.post("http://localhost/vue_eCommerce_api/api.image.php",fd,{
              onUploadProgress(uploadEven){
                //console.log(Math.round((uploadEven.loaded/uploadEven.total)*100));
                _this.finishedImageUploaded = Math.round((uploadEven.loaded/uploadEven.total)*100);
              }
            }).then(res=>{
              console.log(res);
              if(res.data.response.error)
              {
                console.log("Upload image error");
                reject(false);
              }
              else
              {
                resolve({'url':res.data.response.data, "message":res.data.response.message});
              }
            });
        }
        
      });

      p.then(res=>{
        console.log(res);
        _this.uploadedUrl = res.url;
        _this.imageApiReturnMessage = res.message;
        //console.log(_this.uploadedUrl);
        //console.log(_this.imageApiReturnMessage);
        _this.newProduct.image = res.url
        //console.log(_this.newProduct);
        _this.sendData.service_name = "addNewProduct";
        _this.sendData.param = _this.newProduct;
        _this.$axios.post("http://localhost/vue_eCommerce_api/", JSON.stringify(this.sendData),{headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem("token"),}})
          .then(res=>{
          console.log(res);
          _this.$eventBus.$emit("loadingStatus",false);
          if(res.data.response.error){
            _this.$iziToast.error({
                title: 'Error',
                message: res.data.response.message ,
            });
          } else {
            //_this.uploadedUrl = "";
            _this.showingAddModel = false;
            _this.fetchAllProduct();          
            _this.$iziToast.success({
                title: 'Success',
                message: res.data.response.message ,
            });
          }
        });
      }).catch(res=>{ 
        console.log(res);
        _this.$eventBus.$emit("loadingStatus",false);
        _this.showingAddModel = false;
      });

      /*this.imageUpload().then(res=>{
        console.log(res);
        console.log(_this.imageApiReturnMessage);
        console.log(_this.uploadedUrl);
      });*/

      /*let a = await this.imageUpload();
      console.log(a);
      console.log(_this.imageApiReturnMessage);
      console.log(_this.uploadedUrl);*/

      return;
    },
    /*addNewProduct(){
      if (!this.newProduct.product_name) {
        this.$iziToast.error({
              title: 'Error',
              message: "Product name can not be empty" ,
          });
        document.getElementById("newproddName").focus();
        return;
      }
      if (this.imageUpload()) {
        this.newProduct.image = this.uploadedUrl;
        //this.uploadedUrl = "";
      }
      console.log(this.newProduct);
      //return;
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "addNewProduct";
      this.sendData.param = this.newProduct;
      //console.log(JSON.stringify(this.sendData));
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
          //appThis.uploadedUrl = "";
          appThis.showingAddModel = false;
          appThis.fetchAllProduct();          
          appThis.$iziToast.success({
              title: 'Success',
              message: res.data.response.message ,
          });
        }
      });
    },*/

    updateProduct(){
      if (!this.clickedprodd.product_name) {
        this.$iziToast.error({
              title: 'Error',
              message: "Product name can not be empty" ,
          });
        document.getElementById("newproddName").focus();
        return;
      }
      this.$eventBus.$emit("loadingStatus",true);
      var _this = this;

      let p = new Promise((resolve, reject)=>{
        var elm = document.getElementById("updateProductImage");
        var fd = new FormData();
        if (typeof elm.files[0] === 'undefined') {
              //console.log("before ");
              reject(false);
        }
        else{
          fd.append("fileToUpload",elm.files[0],elm.files[0].name);
          _this.$axios.post("http://localhost/vue_eCommerce_api/api.image.php",fd,{
              onUploadProgress(uploadEven){
                //console.log(Math.round((uploadEven.loaded/uploadEven.total)*100));
                _this.finishedImageUploaded = Math.round((uploadEven.loaded/uploadEven.total)*100);
              }
            }).then(res=>{
              //console.log(res);
              if(res.data.response.error)
              {
                console.log("Upload image error");
                reject(false);
              }
              else
              {
                resolve({'url':res.data.response.data, "message":res.data.response.message});
              }
            });
        }
        
      });


      p.then(res=>{
        console.log(res);
        _this.clickedprodd.product_image = res.url;
        _this.sendData.service_name = "updateProduct";
        _this.sendData.param = _this.clickedprodd;
        console.log(JSON.stringify(_this.sendData));
        _this.$axios.post("http://localhost/vue_eCommerce_api/", JSON.stringify(_this.sendData),{headers: {'Content-Type': 'application/json', 'Authorization' : 'Bearer ' + localStorage.getItem("token"),}})
          .then(res=>{
          console.log(res);
          _this.$eventBus.$emit("loadingStatus",false);
          if(res.data.response.error){
            _this.$iziToast.error({
                title: 'Error',
                message: res.data.response.message ,
            });
          } else {
            //_this.uploadedUrl = "";
            _this.showingEditModel = false;
            _this.fetchAllProduct();          
            _this.$iziToast.success({
                title: 'Success',
                message: res.data.response.message ,
            });
          }
        });
      }).catch(res=>{ 
        console.log(res);
        _this.$eventBus.$emit("loadingStatus",false);
        _this.showingEditModel = false;
      });



    },

    deleteProduct(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "deleteProduct";
      this.sendData.param = this.clickedprodd;
      //console.log(JSON.stringify(this.sendData));
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
          appThis.showingDeleteModel = false;
          appThis.clickedprodd={};
          appThis.fetchAllProduct();
          appThis.$iziToast.success({
              title: 'Success',
              message: res.data.response.message ,
          });
        }
      });
    },

    imageUploadq(){
      var elm = document.getElementById("productImage");
      var appThis = this;
      var fd = new FormData();
      if (typeof elm.files[0] === 'undefined') {
            //console.log("before ");
            return false;
      }
      else{
        fd.append("fileToUpload",elm.files[0],elm.files[0].name);
        this.$axios.post("http://localhost/vue_eCommerce_api/api.image.php",fd,{
            onUpload(uploadEven){
              //console.log(Math.round((uploadEven.loaded/uploadEven.total)*100));
              appThis.finishedImageUploaded = Math.round((uploadEven.loaded/uploadEven.total)*100);
            }
          }).then(res=>{
            console.log(res);
            if(res.data.response.error)
            {
              console.log("after image error");
              appThis.imageApiReturnMessage = res.data.response.message;
            }
            else
            {
              appThis.uploadedUrl = res.data.response.data;
              //console.log(appThis.uploadedUrl);
              appThis.imageApiReturnMessage = res.data.response.message;
              //console.log(appThis.imageApiReturnMessage);
              return true;
            }
          });
          //console.log("next line");
          console.log(appThis.uploadedUrl);
          console.log(appThis.imageApiReturnMessage);
          return true;
      }
    },


  }
}
</script>

