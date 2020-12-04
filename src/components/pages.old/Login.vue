<template>
  <div class="login">
    
    <div class="loginHeader">
      User LogIn
    </div>

    <div class="loginContainer">
      <table>
        <tr>
          <td>Email</td>
          <td>:</td>
          <td><input type="text" placeholder="Email" name="email" v-model="param.email"></td>
        </tr>
        <tr>
          <td>Password</td>
          <td>:</td>
          <td><input type="Password" placeholder="Password" name="password" v-model="param.pass"></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td><button class="addBtn" v-on:click="loginNow()">Login</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      param: {
        email: "",
        pass: "",
      },
      sendData: {
        service_name: "generatetoken",
      },
    }
  },
  mounted(){
    this.varifyToken();
  },

  methods: {
    loginNow(){
      this.$eventBus.$emit("loadingStatus",true);
      var appThis = this;
      //var formData = this.toFromData(this.user);
      this.sendData.param = this.param;
      //console.log(JSON.stringify(this.sendData));
      this.$axios.post("http://localhost/vue_eCommerce_api/", JSON.stringify(this.sendData),{headers: {'Content-Type': 'application/json',}})
      .then(res=>{
        //console.log(res.data.response.status);
        appThis.$eventBus.$emit("loadingStatus",false);
        if(res.data.response.status !== 200){
          appThis.$iziToast.error({
              title: 'Error',
              message: res.data.response.message ,
          });
        } else {
          //console.log(res.data.response.message.token);
          localStorage.setItem("token",res.data.response.message.token);
          appThis.$router.push({name: "admin"});
        }
      });
    },

    toFromData(obj){
      var form_data = new FormData();
      for(var key in obj){
        form_data.append(key,obj[key]);
      }
      return form_data;
    },

    varifyToken(){
      
      var token = localStorage.getItem("token");
      //console.log("tonen: "+token);
      if(token == ""){
        //this.$router.push({name: "login"});
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
                message: "Please login to view contents" ,
            });
            localStorage.setItem("token","");
          } else{
            appThis.$router.push({name: "admin"});  
          }
          
        });
      }
    },


  }
}
</script>
