<template>
  <div :class="isCollapse? 'is-collapse rotate' : 'is-collapse'" @click="handleCollapse">
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'collapseBtn',
  data () {
    return {
      isCollapse: this.$store.state.app.sidebar.isCollapse
    }
  },
  methods: {
    handleCollapse () {
      this.$store.state.app.sidebar.isCollapse = this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss" scoped>
  .is-collapse {
    position: fixed;
    top: 50%;
    left: 180px;
    z-index: 9;
    width: 8px;
    height: 50px;
    margin-top: -20px;
    border-radius: 0 6px 6px 0;
    background-color: rgb(96, 161, 221);
    overflow: hidden;
    transition: all 0.1s;
    cursor: pointer;
    &:after {
      content: '';
      position: absolute;
      top: 20px;
      left: -4px;
      display: block;
      width: 0px;
      height: 0px;
      border: 5px solid;
      border-color: transparent #fff transparent transparent;
    }
    &:hover {
      &:after {
        border-color: transparent $theme-default-act transparent transparent;
      }
    }
  }
  .rotate {
    left: 64px;
    &:after {
      left: 2px;
      border-color: transparent transparent transparent #fff;
    }
    &:hover {
      &:after {
        border-color: transparent transparent transparent $theme-default-act;
      }
    }
  }
</style>
