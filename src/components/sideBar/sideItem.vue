<template>
  <div class="side-item">
    <template v-for="(route, index) in item">
      <!-- 展示只有一个连接的路由 -->
      <template v-if="route.children && route.children.length == 1" >
        <router-link :to="route.children[0].path" :key="index">
          <el-menu-item class="only-one-children" :index="route.children[0].path">
            <i class="el-icon-menu"></i>
            <span slot="title">{{route.children[0].name}}</span>
          </el-menu-item>
        </router-link>
      </template>
      <!-- 正常展示路由 -->
      <template v-else>
        <el-submenu v-if="route.children" :key="index" :index="route.path">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">{{route.name}}</span>
          </template>
          <side-item :item="route.children"></side-item>
        </el-submenu>
        <router-link v-else :to="route.path" :key="index">
          <el-menu-item :index="route.path">
            {{route.name}}
          </el-menu-item>
        </router-link>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sideItem',
  props: {
    item: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>
