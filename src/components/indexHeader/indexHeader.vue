<template>
  <nav :class="hideHeader ? 'index-header hide clearfix' : 'index-header clearfix'">
    <div :class="!isCollapse ? 'index-logo show-img' : 'index-logo'" ref="logo">
      <img v-show="!isCollapse" src="../../assets/images/logo.png" />
      <span v-show="isCollapse">MJB</span>
    </div>
    <collapse-btn ref="collapse"></collapse-btn>
    <ul v-if="!showSmallNav" class="nav-wrap clearfix" ref="navWrap">
      <li class="nav-list" v-for="(item, index) in navList" v-bind:key="index">
        <span :class="actType == item.navType ? 'act' : ''" @click="showSideBar(item.navType)">{{item.navName}}</span>
      </li>
    </ul>
    <div v-else class="small-nav">
      <div class="all-nav">所有菜单</div>
      <ul class="nav-wrap clearfix" ref="navWrap">
        <li class="nav-list" v-for="(item, index) in navList" v-bind:key="index">
          <span :class="actType == item.navType ? 'act' : ''" @click="showSideBar(item.navType)">{{item.navName}}</span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import collapseBtn from '../collapseBtn/collapseBtn'
export default {
  name: 'indexHeader',
  components: {
    collapseBtn
  },
  data () {
    return {
      navList: [
        {
          navName: '系统管理',
          navType: 'portal'
        }, {
          navName: '商品管理',
          navType: 'pms'
        }, {
          navName: '订单售后',
          navType: 'oms'
        }, {
          navName: '商家管理',
          navType: 'scm'
        }, {
          navName: '店铺会员管理',
          navType: 'oms2'
        }, {
          navName: '提现退款管理',
          navType: 'fms'
        }, {
          navName: '京东订单',
          navType: 'ygoms'
        }, {
          navName: '发票管理',
          navType: 'inv'
        }, {
          navName: '财务报表',
          navType: 'fms2'
        }, {
          navName: '运营管理',
          navType: 'oss'
        }, {
          navName: '大客户管理',
          navType: 'b2b'
        }, {
          navName: '配置中心管理',
          navType: 'portal2'
        }
      ],
      actType: 'default',
      showSmallNav: false,
      navWrapWidth: 0,
      hideHeader: false
    }
  },
  watch: {
    $route () {
      this.getNavType()
    }
  },
  computed: {
    isCollapse () {
      if (this.$refs.logo) {
        this.resizeToNav()
      }
      return this.$store.state.app.sidebar.isCollapse
    }
  },
  methods: {
    showSideBar (navType) {
      this.actType = navType
      this.$store.commit('CLICK_NAV', navType)
    },
    resizeToNav () {
      let timer = null
      clearTimeout(timer)
      this.hideHeader = true
      timer = setTimeout(() => {
        let logoWidth = this.$refs.logo.clientWidth
        let collapseWidth = this.$refs.collapse.$el.clientWidth
        let wWidth = window.innerWidth
        if (wWidth - logoWidth - collapseWidth - 10 < this.navWrapWidth) {
          this.showSmallNav = true
        } else {
          this.showSmallNav = false
        }
        this.hideHeader = false
        clearTimeout(timer)
      }, 310)
    },
    getNavType () {
      let reg = /\/.*\//
      let path
      let navType
      if (this.$route.path.match(reg)) {
        path = this.$route.path.match(reg)[0]
        navType = path.substring(1, path.length - 1)
        this.showSideBar(navType)
      }
    }
  },
  mounted () {
    // 初始化导航和侧边栏
    this.getNavType()
    // 导航栏展示
    this.navWrapWidth = this.$refs.navWrap.clientWidth
    this.resizeToNav()
    window.addEventListener('resize', () => {
      this.resizeToNav()
    }, false)
  }
}
</script>

<style lang="scss" scoped>
  .index-header {
    position: relative;
    z-index: 99;
    height: 50px;
    background-color: $theme-default;
  }
  .index-logo, .nav-wrap, .small-nav {
    float: left;
  }
  .index-logo {
    width: 63px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    transition: all .3s;
    span {
      font-size: 18px;
      text-align: right;
      font-weight: bold;
      color: $theme-default-fzc;
    }
    img {
      vertical-align: middle;
    }
    &:after {
      content: '';
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
  .show-img {
    width: 179px;
  }
  .nav-wrap {
    background-color: $theme-default;
    .nav-list {
      float: left;
      span {
        display: block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        padding: 0 10px;
        box-sizing: border-box;
        color: $theme-default-fzc;
        border-bottom: 1px solid transparent;
        cursor: pointer;
        &:hover {
          color: $theme-default-act;
        }
      }
      .act {
        background-color: #fff;
        color: $theme-default;
      }
    }
  }
  .small-nav {
    position: relative;
    height: 50px;
    line-height: 50px;
    color: $theme-default-fzc;
    .all-nav {
      padding-left: 10px;
    }
    &:hover .all-nav {
      color: $theme-default-act;
    }
    &:hover .nav-wrap {
      display: block;
    }
    .nav-wrap {
      position: absolute;
      top: 50px;
      left: 0;
      display: none;
      width: 100%;
    }
  }
  .hide {
    overflow: hidden;
  }
</style>
