<template>
  <div class="index">
    <el-container direction="vertical">

      <!--头部-->
      <el-header height="65">
        <Navbar :menuDatas="menuData" :settingData="settingData"></Navbar>
      </el-header>
      <el-container>
        <!--左侧-->
        <el-aside width="200px">
          <Asidebar></Asidebar>
        </el-aside>
        <!--右侧-->
        <el-main>
          <!--<transition name="fade">-->
            <router-view></router-view>
            <router-link to="main"></router-link>
          <!--</transition>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {Navbar, Asidebar} from '../../components/home'
import AppMain from './main'

export default {
  name: 'index-vue',
  components: {Navbar, Asidebar, AppMain},
  data () {
    const menus_ = [{
      menuId: '1',
      menuName: '系统管理',
      subMenu: [
        {menuId: 1.1, menuName: '用户管理', menuUrl: '/users'},
        {menuId: 1.2, menuName: '角色管理', menuUrl: '/roles'},
        {menuId: 1.3, menuName: '菜单管理', menuUrl: '/menus'}
      ]
    },
    {
      menuId: '2',
      menuName: '账单管理',
      subMenu: [
        {menuId: 2.1, menuName: '产品管理', menuUrl: '/produces'},
        {menuId: 2.2, menuName: '支出记录', menuUrl: '/stocks'},
        {menuId: 2.3, menuName: '销售记录', menuUrl: '/sales'}
      ]
    },
    {
      menuId: '3',
      menuName: '关于我们',
      subMenu: [
        {menuId: 3.1, menuName: '公司简介', menuUrl: '/31'},
        {menuId: 3.2, menuName: '关于我们', menuUrl: '/32'},
        {menuId: 3.3, menuName: '人员招聘', menuUrl: '/33'}
      ]
    }]
    const settingData_ = [
      {menuId: 1, menuName: '个人信息', menuUrl: '/setting', code: 'setting'},
      {menuId: 2, menuName: '消息代办', menuUrl: '/todo', code: 'todo'},
      {menuId: 3, menuName: '修改密码', menuUrl: '/updatePassword', code: 'updatePassword'},
      {menuId: 4, menuName: '注销', menuUrl: '/logout', code: 'logout'}
    ]
    return {
      menuData: menus_,
      settingData: settingData_
    }
  },
  mounted: function () {
    this.$router.push({name: 'main'})
  }
}
</script>

<style scoped lang="scss">

  .index {
    background: $white;
    .el-container {
      width: 100%;
      margin-bottom: 40px;
      @include border_;

      .el-header {
        font-size: 12px;
        text-align: center;
        line-height: 60px;
        height: 65px;
        border-bottom: 1px solid $huise;
      }

      .el-aside {
        text-align: center;
        line-height: 200px;
      }

      .el-main {
        background-color: $white;
        text-align: center;
        line-height: 40px;
      }

    }

  }
</style>
