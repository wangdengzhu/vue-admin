<template>
<div :class="!isCollapse ? 'tabs-view-wrap' : 'tabs-view-wrap small-side-bar'">
  <el-scrollbar
    ref="scrollContainer"
    class="scroll-container">
    <router-link
      v-for="tag in visitedViews"
      ref="tag"
      :class="isActive(tag)?'active':''"
      :to="tag.fullPath"
      :key="tag.path"
      tag="span"
      class="tabs-view-item">
      {{ tag.name }}
      <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
    </router-link>
  </el-scrollbar>
</div>
</template>

<script>
export default {
  name: 'routerTabs',
  data () {
    return {
    }
  },
  watch: {
    $route () {
      this.addViewTags()
      this.moveToCurrentTag()
    }
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    },
    isCollapse () {
      this.setWrapWidth()
      return this.$store.state.app.sidebar.isCollapse
    }
  },
  methods: {
    moveToTarget ($target) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      if ($targetLeft > $containerWidth) {
        // 标签在左边
        $scrollWrapper.scrollLeft = $targetLeft - $containerWidth + $targetWidth + 10
      } else {
        // 标签在右边
        $scrollWrapper.scrollLeft = $targetLeft - 10
      }
    },
    isActive (route) {
      return route.path === this.$route.path
    },
    addViewTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('addView', this.$route).then(() => {
          this.setWrapWidth()
        })
      }
      return false
    },
    setWrapWidth () {
      if (!this.$refs.scrollContainer) {
        return
      }
      let wrap = this.$refs.scrollContainer.$refs.wrap
      if (wrap.scrollWidth > wrap.clientWidth) {
        this.$refs.scrollContainer.$children['0'].$refs.thumb.style.width = (wrap.clientWidth * 100 / wrap.scrollWidth) + '%'
      } else {
        this.$refs.scrollContainer.$children['0'].$refs.thumb.style.width = ''
      }
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.moveToTarget(tag.$el)
            /* if (tag.to !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            } */
            break
          }
        }
      })
    },
    closeSelectedTag (view) {
      // 如果url等于初始化页面的时候
      if (this.$route.path == '/portal/portal1') {
        return
      }
      this.$store.dispatch('delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          const latestView = visitedViews.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/portal')
          }
        }
        this.setWrapWidth()
      })
    }
  },
  mounted () {
    this.addViewTags()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs-view-wrap {
    position: relative;
    z-index: 2;
    height: 36px;
    width: 100%;
    padding-left: 180px;
    box-sizing: border-box;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    user-select: none;
    .scroll-container {
      width: 100%;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      /deep/ {
        .el-scrollbar__bar {
          bottom: 0px;
        }
        .el-scrollbar__wrap {
          overflow-x: auto;
          height: 49px;
        }
      }
      .tabs-view-item {
        display: inline-block;
        position: relative;
        cursor: pointer;
        height: 26px;
        line-height: 26px;
        border: 1px solid #d8dce5;
        color: #495060;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 4px;
        &:first-of-type {
          margin-left: 10px;
        }
        &:last-of-type {
          margin-right: 10px;
        }
        &.active {
          background-color: $theme-default;
          color: #fff;
          border-color: $theme-default;
          &::before {
            content: "";
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
        &:hover {
          border-color: $theme-default;
        }
      }
    }
  }
  .small-side-bar {
    padding-left: 64px;
  }
</style>
