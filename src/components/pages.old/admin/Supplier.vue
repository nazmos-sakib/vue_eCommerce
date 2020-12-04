<template>
  <div >
    <model modelHeading="Add new Supplier" :cond = 'showingAddModel' @modelClose="showingAddModel = false">
      

      <table>
        <tr>
          <td>Supplier Name</td>
          <td>
            <input type="text" id="newSupName" v-model="newSupplier.supplier_name">
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            <textarea type="text"v-model="newSupplier.supplier_description" > </textarea>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="addNewSupplier()">Add</button>
          </td>
        </tr>
      </table>


    </model>

    <!------------------update supplier ------------->
    <model modelHeading="Update Supplier" :cond = 'showingEditModel' @modelClose="showingEditModel = false">
      

      <table>
        <tr>
          <td>Supplier Name</td>
          <td>
            <input type="text" id="newSupName" v-model="clickedSup.supplier_name">
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            <textarea type="text"v-model="clickedSup.supplier_description"> </textarea>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="updateSupplier()">Update</button>
          </td>
        </tr>
      </table>


    </model>

    <!------------------delete supplier ------------->
    <model modelHeading="Delete Supplier" :cond = 'showingDeleteModel' @modelClose="showingDeleteModel = false">
      
      <h2>Are you sure you want to delete this supplier??</h2>
      <table>
        <tr>
          <td>Supplier Name: {{clickedSup.supplier_name}}</td>
        </tr>
        
        <tr>
          <td>
            <button class="btnSave" @click="deleteSupplier()">Yes</button>
          </td>
          <td>
            <button class="btnClose" @click="showingDeleteModel = false">No</button>
          </td>
        </tr>
      </table>


    </model>






    <h2 class="fleft"> Suppliers</h2>
    <button class="addBtn fright" @click="showingAddModel = true">Add New</button>
    <div class="clear"></div>
    <hr>

    <table class="nice-table">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
      <tr v-for="cat in fetchedData" :key="cat.id">
        <td>{{cat.supplier_id}}</td>
        <td> {{cat.supplier_name}} </td>
        <td>{{cat.supplier_description}}</td>
        <td><button class="edit" @click="showingEditModel = true; clickedSup = cat">Edit</button></td>
        <td><button class="delete" @click="showingDeleteModel = true; clickedSup = cat">delete</button></td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  name: 'Supplier',
  data () {
    return {
      showingAddModel : false,
      showingEditModel : false,
      showingDeleteModel : false,

      newSupplier:{
        supplier_name: "",
        supplier_description: ""
      },
      service_name:[
        "getAllSupplier",
        "addNewSupplier",
        "updateSupplier",
        "deleteSupplier"
      ],
      sendData : {
        service_name: "",
        param:{}
      },
      fetchedData: [],
      clickedSup: {},
    }
  },
  mounted() {
    this.fetchAllSupplier();
  },
  methods: {

    fetchAllSupplier(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
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
          appThis.fetchedData = res.data.response.message;
        }
      });
    },
    
    addNewSupplier(){
      if (!this.newSupplier.supplier_name) {
        this.$iziToast.error({
              title: 'Error',
              message: "Supplier name can not be empty" ,
          });
        document.getElementById("newSupName").focus();
        return;
      }
      //console.log(this.newSupplier);
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "addNewSupplier";
      this.sendData.param = this.newSupplier;
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
          //console.log(res.data.response.message.token);
          
          appThis.showingAddModel = false;
          appThis.fetchAllSupplier();          
          appThis.$iziToast.success({
              title: 'Success',
              message: res.data.response.message ,
          });
        }
      });
    },

    updateSupplier(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "updateSupplier";
      this.sendData.param = this.clickedSup;
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
          //console.log(res.data.response.message.token);
          
          appThis.showingEditModel = false;
          appThis.clickedSup={};
          appThis.fetchAllSupplier();
          appThis.$iziToast.success({
              title: 'Success',
              message: res.data.response.message ,
          });
        }
      });
    },

    deleteSupplier(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "deleteSupplier";
      this.sendData.param = this.clickedSup;
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
          appThis.showingDeleteModel = false;
          appThis.clickedSup={};
          appThis.fetchAllSupplier();
          appThis.$iziToast.success({
              title: 'Success',
              message: res.data.response.message ,
          });
        }
      });
    },


  }
}
</script>

</style>
