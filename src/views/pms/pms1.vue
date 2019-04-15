<template>
  <div>
    pms1
    <el-input @input="handleInput"/>
  </div>
</template>

<script>
export default {
  name: 'pms1',
  data () {
    return {
    }
  },
  methods: {
    handleInput () {
      let cc = new this.DataSource()
      console.log(cc.getData())
    }
  }
}
</script>
