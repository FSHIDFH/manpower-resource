import { getToken, setToken, removeToken } from "@/utils/auth";
import { login, getUserInfo, getUserDetailById } from "@/api/user";
// 状态
const state = {
  token: getToken(), //把token放到缓存当中
  userInfo: {}, //用户信息
};
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token; // 设置token  只是修改state的数据  123 =》 1234
    // vuex变化 => 缓存数据
    setToken(token); // vuex和 缓存数据的同步(注意这个setToken是从auth.js导入的)
  },
  // 删除缓存
  removeToken(state) {
    state.token = null; // 删除vuex的token
    removeToken(); // 先清除 vuex  再清除缓存 vuex和 缓存数据的同步
  },
  // 设置用户信息
  setUserInfo(state, userInfo) {
    //state.userInfo = userInfo; // 这个也是响应式，直接修改对象本身的数据
    //也可以如下写法：
    state.userInfo = { ...userInfo }; // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除用户信息
  reomveUserInfo(state) {
    state.userInfo = {};
  },
};
// 执行异步
// 执行异步
const actions = {
  // 定义login action  也需要参数 调用action时 传递过来的参数
  async login(context, data) {
    // 经过响应拦截器的处理之后 这里的result实际上就是 token
    const result = await login(data); // 实际上就是一个promise  result就是执行的结果
    // actions 修改state 必须通过mutations
    context.commit("setToken", result);
  },
  async getUserInfo(context) {
    const result = await getUserInfo(); // result就是用户的基本资料
    //这个接口需要用户的userId，在前一个接口处，我们已经获取到了，所以可以直接在后面的内容去衔接
    const baseInfo = await getUserDetailById(result.userId); // 为了获取头像
    const baseResult = { ...result, ...baseInfo }; // 将两个接口结果合并
    // 此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口
    context.commit("setUserInfo", baseResult); // 提交mutations
    // 加一个点睛之笔  这里这一步，暂时用不到，但是请注意，这给我们后边会留下伏笔
    return baseResult;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
