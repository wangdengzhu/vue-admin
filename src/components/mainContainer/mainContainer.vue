<template>
  <div :class="isCollapse ? 'main-container collapse' : 'main-container'" :style="{height: height}">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'mainContainer',
  data () {
    return {
      height: '0px'
    }
  },
  watch: {
    $route () {
      this.addViewTags()
    }
  },
  computed: {
    cachedViews () {
      return this.$store.state.tagsView.cachedViews
    },
    key () {
      return this.$route.fullPath
    },
    isCollapse () {
      if (this.$refs.logo) {
        this.resizeToNav()
      }
      return this.$store.state.app.sidebar.isCollapse
    }
  },
  mounted () {
    if (this.$store.state.tagsView.cachedViews.length == 0) {
      this.addViewTags()
    }
    let wh = window.innerHeight
    let h = this.$el.offsetTop
    this.$nextTick(() => {
      this.height = wh - h - 12 + 'px'
    })
  },
  methods: {
    addViewTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route)
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    padding: 6px 6px 6px 190px;
    transition: padding .3s;
    background-color: #fff;
    overflow-y: auto;
  }
  .collapse {
    padding-left: 74px;
  }
</style>
