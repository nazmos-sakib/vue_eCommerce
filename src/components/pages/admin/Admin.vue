<template>
  <div class="admin">
    <div id = "header">
      <h1 class="fleft">Buy your desiar prooduct</h1>
      <a href="#" class="fright" @click="logoutNow()">Logout</a>
      
    </div>

    <LeftSideBar/>
  

    <div id= "main" >
      <router-view/>      
    </div>
    

  </div>
</template>

<script>

import LeftSideBar from "../../others/LeftSideBar.vue"


export default {
  name: 'Admin',
  data () {
    return {
      sendData : {
        service_name: "verifyToken",
        "param" : {}
      },
    }
  },
  mounted()
  {
    this.varifyToken();
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
    LeftSideBar
  },

  
}
</script>
