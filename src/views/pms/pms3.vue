<template>
  <div>
    <el-radio-group v-model="status" @change="handleChange" size="small">
      <el-radio-button v-for="item in statusList" :label="item.Value" :key="item.Value">{{item.Label}}</el-radio-button>
    </el-radio-group>
    <mjb-table :parentData="tableData" auto-bind auto-height pager>
      <el-table-column type="selection"></el-table-column>
        <el-table-column prop="ID" label="SPUID" width="100">
          <a slot-scope="props" v-bind:href="'productdetail?spuid='+props.row.ID" target="_blank" v-text="props.row.ID"></a>
        </el-table-column>
        <el-table-column prop="SpuName" label="SPU名称" show-overflow-tooltip>
          <span slot-scope="props">
            {{props.row.SpuName ? props.row.SpuName.replace(/\s/g,'&nbsp;') : props.row.SpuName}}
          </span>
        </el-table-column>
        <el-table-column prop="SkuPic" label="sku图" show-overflow-tooltip width="60"></el-table-column>
        <el-table-column prop="SortName" sortable label="分类" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="BrandName" label="品牌" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="UnitName" label="单位" width="60"></el-table-column>
        <el-table-column prop="ProdTypeDesc" label="商品类型" width="80" show-overflow-tooltip></el-table-column>
        <el-table-column prop="NeedCheck" label="商家确认" width="80">
          <div slot-scope="props">
            <span v-text="props.row.NeedCheck?'是':'否'"></span>
            <span v-if="props.row.NeedCheck" v-text="'('+props.row.SupplierShortName+')'"> </span>
          </div>
        </el-table-column>
        <el-table-column prop="StatusDesc" label="状态" width="100"></el-table-column>
        <el-table-column prop="IsSystemExec" v-if="status==9" label="下架类型" width="90">
            <template slot-scope="props">
                {{props.row.IsSystemExec?'自动下架':'人工下架'}}
            </template>
        </el-table-column>
        <el-table-column prop="Remark" v-if="status==9" label="下架原因" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="AllowInvoice" label="是否开票" width="80">
          <div slot-scope="props">
            <span v-text="props.row.AllowInvoice?'是':'否'"></span>
          </div>
        </el-table-column>
        <el-table-column prop="EditUrgencyDesc" label="编辑紧急度" width="90">
          <div slot-scope="props">
            <span style="color: red;" v-if="props.row.EditUrgency == 2">{{props.row.EditUrgencyDesc}}</span>
            <span v-else>{{props.row.EditUrgencyDesc}}</span>
          </div>
        </el-table-column>
        <el-table-column prop="EditStatusDesc" label="编辑状态" width="90"></el-table-column>
        <el-table-column label="编辑锁" width="90">
          <div slot-scope="props">
            <span style="color: red;" v-if="props.row.EditLock">锁定中</span>
            <span v-else>未锁定</span>
          </div>
        </el-table-column>
        <el-table-column prop="CreatedTime" sortable label="新增日期" width="100"></el-table-column>
        <el-table-column prop="PurchaserName" label="采购负责人" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Log" v-if="status==5||status==11" label="审核失败原因" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="120">
          <div slot-scope="scope" class="mjb-table-buttons">
            <a class="el-button el-button--text el-button--mini" v-show="scope.row.EditStatus == 20" v-bind:href="'productdetail?spuid='+scope.row.ID" target="_blank">编辑审核</a>
            <button type="button" class="el-button el-button--text el-button--mini" v-on:click="deleteSpu(scope.row)" v-if="scope.row.Status==1||scope.row.Status==5||scope.row.Status==6 ||scope.row.Status==11">删除</button>
            <button type="button" class="el-button el-button--text el-button--mini" v-on:click="viewLog(scope.row)">日志</button>
          </div>
        </el-table-column>
    </mjb-table>
  </div>
</template>

<script>
export default {
  name: 'pms3',
  data () {
    return {
      status: '', // 状态
      // 状态列表，因为是动态数据所以要从后台获取
      statusList: [],
      tableData: this.DataSource({
        transport: {
          name: this.configs.pms['Product-GetProductManageList'],
          data: this.getFilterData
        },
        parseData: function (d) {
          return d.List
        }
      })
    }
  },
  created () {
    let that = this
    let list = this.DataSource({
      transport: {
        name: this.configs.pms['Eleme-GetSpuStatusList']
      },
      parseData: function (d) {
        that.statusList = d.List
      }
    })
    list.read()
  },
  methods: {
    handleChange (val) {
      this.tableData.read()
    },
    getFilterData () {
      let data = {
        status: this.status,
        PageIndex: 1,
        PageSize: 15
      }
      return data
    },
    getTableData () {

    },
    // 展示统计内容
    getSummaries (param) {
      const { columns } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
        }
      })
      return sums
    }
  }
}

</script>

<style scoped>

</style>
