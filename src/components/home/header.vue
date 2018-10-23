<template>
  <div class="vue-header">
    <el-row :gutter="30">
      <el-col :span="4">
          <div class="logo" @click="clickTitle">账务管理系统</div>
      </el-col>

      <el-col :span="16">
        <div class="menu">
          <el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item v-for="item in menuDatas" :key="item.menuId.toString().concat('header')" :index="item.menuId">
              <template slot="title"><i class="el-icon-menu"></i> <span>{{item.menuName}}</span></template>
              <!--<el-menu-item v-for="subItem in item.subMenu" :key="subItem.menuId" :index="subItem.menuId.toString()">-->
                <!--{{subItem.menuName}}-->
              <!--</el-menu-item>-->
            </el-menu-item>
          </el-menu>
        </div>
      </el-col>

      <el-col :span="4">
        <!--<div class="toobar">工具栏</div>-->
        <div class="header-tools">
          <!--<span class="language">当前语言:{{language}}</span>-->
          <span class="shortName">{{author}}</span>
          <div class="user-photo">头像</div>
          <el-dropdown class="drop-style" trigger="hover" :hide-timeout="hideTimeout" @command="clickDownMenu">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,key) in settingData" :key="key" :command="item.code">
                <!--<router-link :to="item.menuUrl" class="route-link"></router-link>-->
                {{item.menuName}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </el-col>
    </el-row>

  </div>
</template>

<script>
import {message} from '@/utils/message'

export default {
  name: 'header-vue',
  props: ['menuDatas', 'settingData'],
  data () {
    return {
      defaultActive: '2',
      hideTimeout: 2000
    }
  },
  computed: {
    author () {
      return this.$store.getters.author
    },
    language () {
      return this.$store.getters.language
    }
  },
  mounted () {
    // this.$root.$store.dispatch('defaultMenu')
    // this.$root.bus.$emit('transferSubMneu', this.$root.$store.getters.defaultMenu)
    // 默认选择第一个
    this.handleSelect(null)
  },
  methods: {
    clickTitle: function () {
      this.$router.push({name: 'main'})
    },
    handleSelect: function (key, path) {
      if (key !== this.defaultActive) {
        if (key == null) {
          key = this.defaultActive
        } else {
          this.defaultActive = key
        }
      } else {
        return false
      }
      let subMenu = []
      for (let datakey in this.menuDatas) {
        let datas = this.menuDatas[datakey]
        if (datas.menuId === key) {
          subMenu.push(datas)
          break
        }
      }
      this.$root.bus.$emit('transferSubMneu', subMenu)
    },
    clickDownMenu: function (key) {
      const vm = this
      switch (key) {
        case 'setting':
          // 设置
          vm.$router.push({name: 'setting'})
          break
        case 'todo':
          // 待办
          vm.$router.push({name: 'todo'})
          break
        case 'updatePassword':
          // 待办
          vm.$router.push({name: 'updatePassword'})
          break
        default :
          // 注销
          vm.$store.dispatch('logout').then(() => {
            vm.$router.push({name: 'login'})
          }).catch(() => {
            message('注销失败', 'error')
            console.error('注销失败')
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/styles/variable.scss';

  .vue-header {
    background-color: white;
    .logo {
      font-size:23px;
      line-height:50px;
      color:#409EFF;
      cursor:pointer;
    }
    .header-tools {
      span {
        float: left
      }
      .shortName {
        width: 5rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .user-photo {
        @include border_;
        margin: 0.3rem 0rem;
        width: 3rem;
        height: 3rem;
        line-height: 3rem;
        float: left;
      }
      .el-dropdown-selfdefine {
        margin-right: 0px !important;
      }
    }
  }
</style>
