const Vue = require('vue')
const Router = require('vue-router')

let env = process.env.NODE_ENV
const _import = require('./_import_' + env)

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login', name: 'login', component: _import('login/login') },
    { path: '/index',
      name: 'index',
      component: _import('home/index'),
      children: [
        { path: '*', name: '404', component: _import('errorPage/404') },
        { path: '/main', name: 'main', component: _import('home/main') },
        { path: '/todo', name: 'todo', component: _import('home/main') },
        { path: '/updatePassword', name: 'updatePassword', component: _import('home/updatePassword') },
        { path: '/setting', name: 'setting', component: _import('home/main') },
        { path: '/users', name: 'userManager', component: _import('user/userManager') },
        { path: '/roles', name: 'roleManager', component: _import('role/roleManager') },
        { path: '/menus', name: 'menuManager', component: _import('menu/menuManager') },
        { path: '/produces', name: 'produceManager', component: _import('bill/produceManager') },
        { path: '/stocks', name: 'stockManager', component: _import('bill/stockManager') },
        { path: '/sales', name: 'saleManager', component: _import('bill/saleManager') }
      ]
    }
  ]
})
