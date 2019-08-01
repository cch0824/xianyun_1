<template>
  <el-form :model="form" ref="form" class="form" :rules="rules">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" v-model="form.password"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-button type="primary" class="submit" @click="loginSubmit">登录</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    loginSubmit() {
      this.$refs.form.validate(valid=>{
        if(valid){
          this.$axios({
        url: "/accounts/login",
        method: "POST",
        data: this.form
      }).then(res => {
        // console.log(res);
        // 保存数据给store仓库,需要调用store中的mutations的方法
        // 第一个参数：是要调用的方法名，需要区分各个模块的方法，前面加仓库名user
        // 第二个参数：是需要保存到store仓库的数据
        this.$store.commit("user/setuserInfo",res.data)
        this.$router.push("/")
      });
        }
      })
      
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.form {
  padding: 25px;
}
.form-item {
  margin-bottom: 20px;
}
.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}
.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
