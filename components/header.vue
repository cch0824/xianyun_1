<template>
  <div class="header">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <!-- logo部分 -->
        <div class="logo">
          <nuxt-link to>
            <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
          </nuxt-link>
        </div>
        <!-- 头部导航栏 -->
        <el-row type="flex" class="nav">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>
        <!-- 登录 -->
        <div class="login" v-if="!$store.state.user.userInfo.token">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <!-- 登录后显示的下拉菜单 -->
        <div class="relogin" v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              {{$store.state.user.userInfo.user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="$store.commit('user/clearUserInfo')">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
.header {
  border-bottom: 1px solid #ccc;
  box-shadow: 0 3px 3px #ccc;
  height: 60px;
  line-height: 60px;
  .main {
    width: 1000px;
    margin: 0 auto;
    .logo {
      margin-top: 9px;
      img {
        width: 156px;
        height: 42px;
        display: block;
      }
    }
    .nav {
      height: 60px;
      flex: 1;
      margin: 0 20px;
      /deep/ .nuxt-link-exact-active {
        background-color: #409eff;
        color: #fff;
      }
      a {
        padding: 0 20px;
        display: block;
        line-height: 60px;
        &:hover {
          border-bottom: 5px solid #409eff;
        }
      }
    }
    .login {
      a {
        font-size: 14px;
        &:hover {
          color: #409eff;
          border-bottom: 1px solid #409eff;
        }
      }
    }
    .el-dropdown-link {
      img {
        border-radius: 50%;
        vertical-align: middle;
        height: 36px;
        width: 36px;
        margin-right: 5px;
      }
    }
  }
}
</style>

