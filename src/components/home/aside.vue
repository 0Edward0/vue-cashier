<template>
  <div>
    <el-menu :default-openeds="['1','2']" router  :default-active="defaultActive">
      <el-submenu v-for="item in subItemDatas" :key="item.menuId" :index="item.menuId">
        <template slot="title"><i class="el-icon-message"></i>{{item.menuName}}</template>
        <el-menu-item v-for="subItem in item.subMenu" :key="subItem.menuId" :index="subItem.menuUrl">
          {{subItem.menuName}}
        </el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
export default {
  name: 'aside-vue',
  // props: ['meuDatas'],
  data () {
    // let _defaultActive = '/users'
    let _defaultActive = ''
    return {
      subItemDatas: [],
      defaultActive: _defaultActive
    }
  },
  created () {
    this.$root.bus.$on('transferSubMneu', (data) => {
      this.subItemDatas = data
    })
  }

}
</script>

<style scoped>

</style>
