const getters = {
  author: state => state.user.author,
  language: state => state.user.language,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  defaultMenu: state => state.menu.defaultMenu
}
export default getters
