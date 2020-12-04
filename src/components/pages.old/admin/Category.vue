<template>
  <div >
    <model modelHeading="Add new Category" :cond = 'showingAddModel' @modelClose="showingAddModel = false">
      

      <table>
        <tr>
          <td>Category Name</td>
          <td>
            <input type="text" id="newCatName" v-model="newCategory.name">
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            <textarea type="text"v-model="newCategory.description" > </textarea>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="addNewCategory()">Add</button>
          </td>
        </tr>
      </table>


    </model>

    <!------------------update category ------------->
    <model modelHeading="Update Category" :cond = 'showingEditModel' @modelClose="showingEditModel = false">
      

      <table>
        <tr>
          <td>Category Name</td>
          <td>
            <input type="text" id="newCatName" v-model="clickedCat.category_name">
          </td>
        </tr>
        <tr>
          <td>Description</td>
          <td>
            <textarea type="text"v-model="clickedCat.category_description"> </textarea>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button class="btnSave" @click="updateCategory()">Update</button>
          </td>
        </tr>
      </table>


    </model>

    <!------------------delete category ------------->
    <model modelHeading="Delete Category" :cond = 'showingDeleteModel' @modelClose="showingDeleteModel = false">
      
      <h2>Are you sure you want to delete this category??</h2>
      <table>
        <tr>
          <td>Category Name: {{clickedCat.category_name}}</td>
        </tr>
        
        <tr>
          <td>
            <button class="btnSave" @click="deleteCategory()">Yes</button>
          </td>
          <td>
            <button class="btnClose" @click="showingDeleteModel = false">No</button>
          </td>
        </tr>
      </table>


    </model>






    <h2 class="fleft"> Categories</h2>
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
        <td>{{cat.category_id}}</td>
        <td> {{cat.category_name}} </td>
        <td>{{cat.category_description}}</td>
        <td><button class="edit" @click="showingEditModel = true; clickedCat = cat">Edit</button></td>
        <td><button class="delete" @click="showingDeleteModel = true; clickedCat = cat">delete</button></td>
      </tr>
    </table>
  </div>

</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      showingAddModel : false,
      showingEditModel : false,
      showingDeleteModel : false,

      newCategory:{
        name: "",
        description: ""
      },
      service_name:[
        "getAllCategory",
        "addNewCategory",
        "updateCategory",
        "deleteCategory"
      ],
      sendData : {
        service_name: "",
        param:{}
      },
      fetchedData: [],
      clickedCat: {},
    }
  },
  mounted() {
    this.fetchAllCategory();
  },
  methods: {

    fetchAllCategory(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
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
          appThis.fetchedData = res.data.response.message;
        }
      });
    },
    
    addNewCategory(){
      if (!this.newCategory.name) {
        this.$iziToast.error({
              title: 'Error',
              message: "Category name can not be empty" ,
          });
        document.getElementById("newCatName").focus();
        return;
      }
      //console.log(this.newCategory);
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "addNewCategory";
      this.sendData.param = this.newCategory;
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
          
          appThis.showingAddModel = false;
          appThis.fetchAllCategory();          
          appThis.$iziToast.success({
              title: 'Success',
              message: res.data.response.message ,
          });
        }
      });
    },

    updateCategory(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "updateCategory";
      this.sendData.param = this.clickedCat;
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
          appThis.clickedCat={};
          appThis.fetchAllCategory();
          appThis.$iziToast.success({
              title: 'Success',
              message: res.data.response.message ,
          });
        }
      });
    },

    deleteCategory(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      this.sendData.service_name = "deleteCategory";
      this.sendData.param = this.clickedCat;
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
          appThis.clickedCat={};
          appThis.fetchAllCategory();
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
