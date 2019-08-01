// 此文件专门用于
// 1.保存数据的属性 state 是一个对象，返回多个对象，类似组件中的data
export const state = () => {
  return {
    userInfo: {
      token: '',
      user: {
        nickname: "名字"
      }
    }
  }
}
//2.同步修改数据 mutations
export const mutations= {
  // 定义方法，设置store数据
  // state:就是上面的statue，state是默认固定的参数
  // data：就是调用时传入的参数
  // 设置保存用户信息
  setuserInfo(state,data){
    state.userInfo=data
  },
  // 清除用户数据(退出时)
  clearUserInfo(state){
    state.userInfo={}
  }
}