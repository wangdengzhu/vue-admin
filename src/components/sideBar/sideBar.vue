<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" :class="isCollapse ? 'collapse' : ''">
    <el-menu
      class="side-bar"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      text-color="#fff"
      active-text-color="#94dfff"
    >
      <side-item :item="setNavType"></side-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import sideItem from './sideItem'
export default {
  name: 'sideBar',
  components: {
    sideItem
  },
  data () {
    return {
    }
  },
  computed: {
    // 设置对应导航
    setNavType () {
      return this.getNavType()
    },
    isCollapse () {
      return this.$store.state.app.sidebar.isCollapse
    }
  },
  methods: {
    getNavType () {
      // 根据url来展示侧边栏
      let navType = this.$store.state.app.navType
      let navList = []
      let routeList = this.$router.options.routes
      for (var i = 0; i < routeList.length; i++) {
        if (routeList[i].path.indexOf(navType) > -1) {
          navList.push(routeList[i])
        }
      }
      return navList
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
  .el-submenu__title i, .side-item .only-one-children i, .only-one-children span {
    color: #fff;
  }
  .side-bar-wrap {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 6;
  }
  .collapse .side-bar {
    width: 64px;
  }
  .side-bar {
    width: 180px;
    height: calc(100vh - 50px);
    background-color: $theme-default2;
    box-sizing: border-box;
  }
  .el-submenu__title, .el-menu-item, .el-submenu .el-menu-item, .only-one-children {
    min-width: auto;
    height: 36px;
    padding: 0 20px;
    line-height: 36px;
    font-size: 12px;
  }
  .el-menu--collapse {
    .side-item {
      .el-submenu__title, .el-menu-item {
        & > span, .el-submenu__icon-arrow {
          display: none;
        }
      }
    }
  }
  .el-submenu.is-active .el-submenu__title, .side-item .only-one-children.is-active {
    border-bottom-color: $theme-default3;
    background-color: $theme-default4;
  }
  .el-submenu__title, .side-item .only-one-children {
    background-color: $theme-default2;
    border-bottom: 1px solid #ddd;
  }
  .el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:hover {
    background-color: rgba(0,0,0,.2)
  }
  .side-item {
    background-color: $theme-default3;
  }
</style>
