<template>
  <div class="app-wrap">
    <index-header></index-header>
    <side-bar class="side-bar-wrap"></side-bar>
    <router-tabs></router-tabs>
    <main-container></main-container>
  </div>
</template>

<script>
import indexHeader from '@/components/indexHeader/indexHeader'
import sideBar from '@/components/sideBar/sideBar'
import mainContainer from '@/components/mainContainer/mainContainer'
import routerTabs from '@/components/routerTabs/routerTabs'
export default {
  name: 'index',
  components: {
    indexHeader,
    sideBar,
    mainContainer,
    routerTabs
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
