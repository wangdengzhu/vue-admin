<template>
  <div class="table-wrap">
    <el-table
      class="mjb-table"
      ref="table"
      size="mini"
      :default-sort="sortRules"
      :height="tableHeight"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      v-loading="loading"
      :data="tableData"
      border
    >
      <slot />
    </el-table>
    <el-pagination
      v-if="pager"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { Table } from 'element-ui'
export default {
  name: 'mjbTable',
  props: {
    // 表格数据源
    parentData: {
      type: Object,
      required: true
    },
    // 是否使用翻页功能
    pager: {
      type: Boolean,
      default: false
    },
    // 默认表格翻页数量
    pageSize: {
      type: Number,
      default: 15
    },
    // 默认表格翻页数量选项
    pageSizes: {
      type: Array,
      default: function () {
        return [15, 30, 50]
      }
    },
    // 表格是否设置自动高度
    autoHeight: {
      type: Boolean,
      default: false
    },
    // 表格是否设置手动高度
    userHeight: {
      type: String,
      default: ''
    },
    // 表格是否显示统计
    showSummary: {
      type: Boolean,
      default: false
    },
    // 合并单元格 功能不完整不推荐使用，后台返回格式未统一
    setRowspan: {
      type: Function,
      default: null
    },
    // 表格是否设置自定义统计
    setSummary: {
      type: Function,
      default: null
    },
    // 表格排序规则
    sortRules: {
      type: Object,
      default: null
    },
    ...Table.props
  },
  data () {
    return {
      // 表格数据
      tableData: [],
      // 加载动画
      loading: false,
      // 表格页码
      currentPage: 1,
      // 表格翻页数量
      pageSize1: this.pageSize,
      // 表格数据总数量
      total: 0,
      // 表格高度
      tableHeight: 0,
      // 表格默认统计
      totalList: null
    }
  },
  watch: {
    parentData: {
      // 设置表格数据
      handler (curVal, oldVal) {
        this.tableData = curVal.getData().List
        // 合并单元格 功能不完整不推荐使用，后台返回格式未统一
        if (this.setRowspan) {
          let obj = {}
          let name = this.setRowspan().name
          for (let i = 0; i < name.length; i++) {
            this.tableData.map(function (v, j) {
              if (!obj[v[name[i]]]) {
                obj[v[name[i]]] = 1
                obj[v[name[i]] + '1'] = j
              } else {
                obj[v[name[i]]]++
              }
            })
            this.tableData.map(function (v) {
              for (let key in obj) {
                if (key == v[name[i]]) {
                  v[name[i] + 'RowSpan'] = obj[key]
                  v[name[i] + 'RowIndex'] = obj[key + '1']
                }
              }
            })
          }
        }
        // 获取表格默认统计
        if (curVal.getData().TotalList) {
          this.totalList = curVal.getData().TotalList
        }
        // 获取表格数据总数量
        this.total = this.tableData.length
        // 设置加载动画
        this.loading = curVal.options.loading
        // 设置页码
        this.currentPage = curVal.options.transport.data.PageIndex
      },
      deep: true
    }
  },
  computed: {
  },
  beforeCreate () {
  },
  created () {
    // 设置初始翻页数量和页码
    let params = Object.assign(this.parentData.options.transport.data, {
      PageIndex: this.currentPage,
      PageSize: this.pageSize1
    })
    this.parentData.setState({
      transport: {
        data: params
      }
    })
  },
  beforeMount () {
  },
  mounted () {
    console.log(this)
    // 自动设置表格高度
    if (this.autoHeight) {
      let h1 = document.documentElement.clientHeight
      this.$nextTick(function () {
        let h2 = this.$refs.table.$el.offsetTop
        this.tableHeight = h1 - h2 - 32
      })
    }
    // 手动设置表格高度
    if (this.userHeight) {
      this.$nextTick(function () {
        this.tableHeight = this.userHeight
      })
    }
  },
  beforeUpdate () {
  },
  updated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  methods: {
    // 页面展示数据数量
    handleSizeChange (val) {
      this.pageSize1 = val
      this.parentData.read({
        PageIndex: this.currentPage,
        PageSize: val
      })
    },
    // 页面展示数据页码
    handleCurrentChange (val) {
      this.currentPage = val
      this.parentData.read({
        PageIndex: val,
        PageSize: this.pageSize
      })
    },
    // 合并单元格 功能不完整不推荐使用，后台返回格式未统一
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (!this.setRowspan) {
        return
      }
      let arrIdx = this.setRowspan().index
      let arrName = this.setRowspan().name
      for (let i = 0; i < arrIdx.length; i++) {
        if (columnIndex === arrIdx[i]) {
          if (rowIndex === 0 && row[arrName[i] + 'RowIndex'] === 0) {
            return {
              rowspan: row[arrName[i] + 'RowSpan'],
              colspan: 1
            }
          } else if (rowIndex % row[arrName[i] + 'RowIndex'] === 0) {
            if (rowIndex / row[arrName[i] + 'RowIndex'] > 1) {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
            return {
              rowspan: row[arrName[i] + 'RowSpan'],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    },
    // 展示统计内容
    getSummaries (param) {
      if (!this.showSummary) {
        return
      }
      const { columns } = param
      const sums = []
      // 自定义展示统计内容
      if (this.setSummary) {
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.setSummary().name
            return
          }
          for (let i = 0; i < this.setSummary().rules.length; i++) {
            if (column.property === this.setSummary().rules[i].name) {
              if (this.setSummary().rules[i].type == 'number') {
                sums[index] = this.setSummary().rules[i].data.toFixed(2)
              } else {
                sums[index] = this.setSummary().rules[i].data
              }
              return
            }
          }
        })
      }
      // 默认展示统计内容
      if (this.totalList) {
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.totalList._Section
            return
          }
          for (let key in this.totalList) {
            if (column.property === key) {
              if (typeof this.totalList[key] == 'number') {
                sums[index] = this.totalList[key].toFixed(2)
              } else {
                sums[index] = this.totalList[key]
              }
              return
            }
          }
        })
      }
      return sums
    }
  }
}
</script>
<style lang="scss">
  .table-wrap {
    background-color: #fff;
  }
  .mjb-table {
    width: 100%
  }
  .is-scrolling-none {
    height: 100%;
  }
</style>
