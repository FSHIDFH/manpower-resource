const getters = {
  sidebar: (state) => state.app.sidebar,
  device: (state) => state.app.device,
  token: (state) => state.user.token, //快捷访问token
  name: (state) => state.user.userInfo.username, // 建立用户名称
  userId: (state) => state.user.userInfo.userId, // 建立用户id的映射
  staffPhoto: (state) => state.user.userInfo.staffPhoto, // 建立用户头像的映射
};
export default getters;
