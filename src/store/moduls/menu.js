const menu = {
  // 创建一个对象来保存应用启动时的初始状态
  state: {
    defaultMenu: '系统管理员'
  },
  mutations: {
    DEFAULT_MENU: (state, defaultMenu_) => { state.defaultMenu = defaultMenu_ }
  },
  actions: {
    defaultMenu ({ commit }) {
      let subMenu = [{
        menuId: '1',
        menuName: '系统管理',
        subMenu: [
          {menuId: 1.1, menuName: '用户管理', menuUrl: '/users'},
          {menuId: 1.2, menuName: '角色管理', menuUrl: '/roles'},
          {menuId: 1.3, menuName: '菜单管理', menuUrl: '/menus'}
        ]
      }]
      commit('DEFAULT_MENU', subMenu)
    }
  }
}
export default menu
