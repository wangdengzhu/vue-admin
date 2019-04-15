import ElementUI from 'element-ui'
import components from './vue-extends'
import { ob } from '@/utils/dataSource'

export default {
  name: 'mjbTable2',
  mixins: [components.data],
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
    // 表格自动请求
    autoBind: {
      type: Boolean,
      default: false
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
    // 合并单元格 功能不完整不推荐使用，后台返回格式未统一
    setRowspan: {
      type: Function,
      default: null
    },
    // 表格排序规则
    sortRules: {
      type: Object,
      default: null
    },
    ...ElementUI.Table.props
  },
  data () {
    return {
      // 表格数据
      tableData: [],
      // 加载动画
      loading: true,
      // 表格页码
      currentPage: 1,
      // 表格翻页数量
      pageSize1: this.pageSize,
      // 表格数据总数量
      total: 0,
      // 表格高度
      tableHeight: 0,
      // 表格默认统计
      totalList: null,
      // 分页样式
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  },
  watch: {
  },
  computed: {},
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
    // 自适应高度
    setAutoHeight () {
      if (this.autoHeight) {
        let h1 = document.documentElement.clientHeight
        this.$nextTick(() => {
          let h2 = this.$refs.table.$el.offsetTop
          this.tableHeight = h1 - h2 - 60
        })
      }
    },
    // 手动设置高度
    setUserHeight () {
      if (this.userHeight) {
        this.$nextTick(() => {
          this.tableHeight = this.userHeight
        })
      }
    },
    // 默认统计
    getSummaries (props) {
      var sums = []
      var data = this.parentData ? this.parentData.orgData : null
      if ((data == null || data) && !data.TotalList) {
        return sums
      }
      var totalList = data.TotalList
      // var keys = Object.keys(totalList)
      props.columns.forEach(function (item, index) {
        var itemVal1 = totalList[item.property] || ''
        var itemVal2 = totalList['_Section'] || '合计'
        if (index === 0) {
          sums[index] = itemVal2
          return
        }
        sums[index] = item.type == 'default' ? itemVal1 : ''
      }, this)
      return sums
    }
  },
  beforeCreate () {},
  created () {
    let that = this
    if (this.autoBind) {
      this.parentData.read()

      // 请求前
      this.parentData.onBeforeHandler((data) => {
        that.loading = data
      })

      // 请求后
      this.parentData.onAfterHandler((data) => {
        that.loading = data
      })

      // 请求成功
      this.parentData.onComplete((data) => {
        that.tableData = data.List
        that.total = data.TotalCount
      })

      // 设置页码
      ob.listen('pageIndexHandler', function (data) {
        that.currentPage = data
      })
    }
  },
  beforeMount () {},
  mounted () {
    // 自动设置表格高度
    if (this.autoHeight) {
      this.setAutoHeight()
    }
    // 手动设置表格高度
    if (this.userHeight) {
      this.setUserHeight()
    }
  },
  beforeUpdate () {},
  updated () {
  },
  beforeDestroy () {},
  destroyed () {
    this.parentData.onRemove()
  },
  render: function (h) {
    var that = this
    return h('div', {
      class: 'table-wrap'
    }, [h('el-table', {
      directives: [{
        name: 'loading',
        rawName: 'v-loading',
        value: that.loading
      }],
      props: that._cloeProps({
        height: that.tableHeight,
        data: that.tableData,
        size: that.size || 'mini',
        border: that.border || true,
        stripe: that.stripe || true,
        maxHeight: that.maxHeight || null
      }),
      on: that._cloneListeners(),
      ref: 'table'
    }, that.$slots.default), h('div', {},
      that.pager ? [h('el-pagination', {
        ref: 'pager',
        'class': {
          'mjb-pager': true
        },
        props: {
          currentPage: that.currentPage,
          pageSizes: that.pageSizes,
          pageSize: that.pageSize1,
          layout: that.layout,
          total: that.total
        },
        on: {
          'size-change': that.handleSizeChange,
          'current-change': that.handleCurrentChange
        }
      })] : [])])
  }
}
