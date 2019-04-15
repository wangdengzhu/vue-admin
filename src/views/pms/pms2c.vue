<template>
  <div>
    <div class="mjb-search-container panel panel-default" v-cloak>
        <div class="panel-body">
            <div class="form-horizontal">
                <div class="form-group">
                    <label class="control-label mjb-label-word3">品牌:</label>
                    <div class="mjb-ibk">
                        <el-select v-model="brand" style="width:200px" v-bind:auto-bind="true" filterable clearable placeholder="请选择">
                            <el-option v-bind:key="prop.Value" slot="items" slot-scope="prop"
                                      v-bind:label="prop.Label"
                                      v-bind:value="prop.Value">
                            </el-option>
                        </el-select>
                    </div>
                    <button type="button" class="el-button el-button--primary el-button--mini mjb-mleft-10" id="btnSearch"><i class="fa fa-search"></i><span>查询</span></button>
                </div>
            </div>
        </div>
    </div>
    <div class="mjb-content-container panel" v-cloak>
        <div class="panel-body">
            <div class="mjb-table-tools">
                <button type="button" class="el-button el-button--primary el-button--mini" id="btnAddBrand"><i class="fa fa-plus-circle"></i><span>新增品牌</span></button>
                <button type="button" class="el-button el-button--primary el-button--mini" id="btnAddBrand"><i class="fa fa-plus-circle"></i><span>新增品牌</span></button>
            </div>
            <el-tabs v-model="moduleInfo" type="card" id="cardModuleInfo" v-on:tab-click="onModuleInfo">
                <el-tab-pane label="精选大牌" name="handpick">
                    <mjb-table v-bind:parentData="handpickTableSource" v-bind:auto-bind="true" v-bind:auto-height="true" ref="handpickTable" v-on:cell-dblclick="cellDblclick" border stripe pager v-on:sort-change="sortChange">
                        <el-table-column label="序号" prop="ID" width="120"></el-table-column>
                        <el-table-column label="模块名称" prop="ChoicenessTypeName"></el-table-column>
                        <el-table-column label="品牌名称" prop="BrandName"></el-table-column>
                        <el-table-column label="品牌副标题" prop="BrandSubtitle"></el-table-column>
                        <el-table-column label="上架spu数量" prop="SpuCount" width="150"></el-table-column>
                        <el-table-column label="排序" prop="Rank" sortable="custom" width="120">
                            <template slot-scope="scope">
                                <div v-for="item in scope" v-bind:key="item.Rank">
                                    <el-tooltip content="双击可修改" placement="left">
                                        <div v-if="!item.CellIsEdit">
                                            {{item.Rank}}
                                        </div>
                                        <div v-show="item.CellIsEdit">
                                            <el-input v-model="item.Rank" v-on:blur="SupplyPriceInputBlur(scope.row)" type="number"></el-input>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="列表图片" width="150">
                            <template slot-scope="scope">
                                <div class="mjb-image-wrapper" style="width:58px;">
                            <mjb-image v-bind:src="scope.row.ListPagePicPathUrl" style="height:48px">
                            </mjb-image>
                            <div class="mjb-image-content">
                                <div class="sku-image-button">
                                    <span class="el-icon-zoom-in" v-on:click="previewImageCarousel('handpickTableSource','listImg',scope.row.ListPagePicPathUrl)"></span>
                                </div>
                            </div>
                        </div>
                                <div class="mjb-image-wrapper">
                                    <mjb-image v-bind:src="scope.row.ListPagePicPathUrl" preview="handpickListImage"></mjb-image>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="首页展示" prop="FirstDisplay" width="150"></el-table-column>
                        <el-table-column label="首页图">
                            <template slot-scope="scope">
                                <div class="mjb-image-wrapper" style="width:58px;">
                            <mjb-image v-bind:src="scope.row.MainPagePicPathUrl" style="height:48px">
                            </mjb-image>
                            <div class="mjb-image-content">
                                <div class="sku-image-button">
                                    <span class="el-icon-zoom-in" v-on:click="previewImageCarousel('handpickTableSource','HomeImg',scope.row.MainPagePicPathUrl)"></span>
                                </div>
                            </div>
                        </div>
                                <div class="mjb-image-wrapper">
                                    <mjb-image v-bind:src="scope.row.MainPagePicPathUrl" preview="handpickMainImage"></mjb-image>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="展示类型" prop="MainPagePicTypeName" width="100"></el-table-column>
                        <el-table-column label="展示位" prop="MainPagePlaceName" width="100"></el-table-column>
                        <el-table-column label="操作">
                            <div slot-scope="prop" class="mjb-table-buttons">
                                <button class="el-button el-button--text el-button--mini" v-on:click="btnEdit(prop.row)">编辑</button>
                                <button class="el-button el-button--text el-button--mini" v-on:click="btnDelete(prop.row)">删除</button>
                                <button class="el-button el-button--text el-button--mini" v-on:click="btnEdit(prop.row)">编辑</button>
                        <button class="el-button el-button--text el-button--mini" v-on:click="btnDelete(prop.row)">删除</button>
                            </div>
                        </el-table-column>
                    </mjb-table>
                </el-tab-pane>
                <el-tab-pane label="推荐品牌" name="recommend">
                    <mjb-table v-bind:parentData="recommendTableSource" v-bind:auto-height="true" ref="recommendTable" v-on:cell-dblclick="cellDblclick" border stripe pager v-on:sort-change="sortChange">
                        <el-table-column label="模块名称" prop="ChoicenessTypeName"></el-table-column>
                        <el-table-column label="品牌名称" prop="BrandName"></el-table-column>
                        <el-table-column label="上架spu数量" prop="SpuCount"></el-table-column>
                        <el-table-column label="排序" prop="Rank" sortable="custom">
                            <template slot-scope="scope">
                                <div v-for="item in scope" v-bind:key="item.Rank">
                                    <el-tooltip content="双击可修改" placement="left">
                                        <div v-if="!item.CellIsEdit">
                                            {{item.Rank}}
                                        </div>
                                        <div v-show="item.CellIsEdit">
                                            <el-input v-model="item.Rank" v-on:blur="SupplyPriceInputBlur(scope.row)" type="number"></el-input>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="列表图片" width="150">
                            <template slot-scope="scope">
                                <div class="mjb-image-wrapper" style="width:58px;">
                            <mjb-image v-bind:src="scope.row.ListPagePicPathUrl" style="height:48px">
                            </mjb-image>
                            <div class="mjb-image-content">
                                <div class="sku-image-button">
                                    <span class="el-icon-zoom-in" v-on:click="previewImageCarousel('recommendTableSource','listImg',scope.row.ListPagePicPathUrl)"></span>
                                </div>
                            </div>
                        </div>
                                <div class="mjb-image-wrapper">
                                    <mjb-image v-bind:src="scope.row.ListPagePicPathUrl" preview="recommendImage"></mjb-image>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <div slot-scope="prop" class="mjb-table-buttons">
                                <button class="el-button el-button--text el-button--mini" id="btnEdit" v-on:click="btnEdit(prop.row)">编辑</button>
                                <button class="el-button el-button--text el-button--mini" v-on:click="btnDelete(prop.row)">删除</button>
                            </div>
                        </el-table-column>
                    </mjb-table>
                </el-tab-pane>
                <el-tab-pane label="品牌热销" name="hotSellBrand">
                    <div style="margin-bottom:10px;">
                        <label class="control-label mjb-label-word3">封面图:</label>
                        <div class="mjb-ibk">
                            <el-upload class="mjb-ibk" v-bind:action="HotImageUrl" size="customWidth"
                                        v-bind:before-upload="beforeUploadSpuImage0"
                                        v-bind:success-handler="spuBigSuccessHandlerHot"
                                        v-bind:on-preview="previewSPUUploadImage"
                                        v-bind:limit="1"
                                        v-bind:file-list.sync="fileList">
                                <template slot-scope="item">
                                    <mjb-image v-bind:src="item.url"></mjb-image>
                                </template>
                            </el-upload>
                            <div class="text-warning mjb-ibk" style="font-size:12px">文件不能超过1M，只支持JPG,格式.图片上传大小：210*280</div>
                        </div>
                    </div>
                    <mjb-table v-bind:parentData="hotSellBrandTableSource" v-bind:auto-height="true" ref="hotSellBrandTable" v-on:cell-dblclick="cellDblclick" border stripe pager v-on:sort-change="sortChange">
                        <el-table-column label="模块名称" prop="ChoicenessTypeName"></el-table-column>
                        <el-table-column label="品牌名称" prop="BrandName"></el-table-column>
                        <el-table-column label="上架spu数量" prop="SpuCount"></el-table-column>
                        <el-table-column label="排序" prop="Rank" sortable="custom">
                            <template slot-scope="scope">
                                <div v-for="item in scope" v-bind:key="item.Rank">
                                    <el-tooltip content="双击可修改" placement="left">
                                        <div v-if="!item.CellIsEdit">
                                            {{item.Rank}}
                                        </div>
                                        <div v-show="item.CellIsEdit">
                                            <el-input v-model="item.Rank" v-on:blur="SupplyPriceInputBlur(scope.row)" type="number"></el-input>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="列表图片">
                            <template slot-scope="scope">
                                <div class="mjb-image-wrapper mjb-ibk">
                                    <mjb-image v-bind:src="scope.row.ListPagePicPathUrl" preview="hotSellBrandImage"></mjb-image>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <div slot-scope="prop" class="mjb-table-buttons">
                                <button class="el-button el-button--text el-button--mini" id="btnEdit" v-on:click="btnEdit(prop.row)">编辑</button>
                                <button class="el-button el-button--text el-button--mini" v-on:click="btnDelete(prop.row)">删除</button>
                            </div>
                        </el-table-column>
                    </mjb-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
    <!-- 图片预览弹出框  -->
    <el-dialog v-bind:visible.sync="dialogVisible" size="tiny" v-cloak>
        <span slot="title">
            {{manTitle}}<span class="mjb-dialog-title"><i>></i><span class="dialogTitle">{{subhead}}</span></span>
        </span>
        <el-carousel v-bind:indicator-position="position" v-bind:autoplay="false" height="600px" ref="carousel" v-bind:arrow="arrow">
            <el-carousel-item v-for="(src,index) in dialogImageUrls" v-bind:key="index" v-bind:name="src">
                <div class="center-vertical mjb-carousel-item">
                    <img v-bind:src="src" class="img-responsive center-block" />
                </div>
            </el-carousel-item>
        </el-carousel>
    </el-dialog>
    <!--  新增或编辑品牌弹出框  -->
    <el-dialog v-bind:visible.sync="dialogBrand" v-bind:close-on-click-modal="false" width="800px" v-cloak>
        <span slot="title">
            {{manTitle}}<span class="mjb-dialog-title"><i>></i><span class="dialogTitle">{{subhead}}</span></span>
        </span>
        <el-form v-bind:model="Form" ref="FormTable" v-bind:rules="FormRules" label-suffix=" ：" label-width="130px">
            <el-form-item prop="brandName" label="品牌名称">
                <el-autocomplete v-model="Form.brandName"
                                v-bind:fetch-suggestions="queryBrand"
                                placeholder="请输入内容"
                                style="width:420px" v-on:select="BrandSelect" v-bind:disabled="isBrandEdit">
                </el-autocomplete>
            </el-form-item>
            <el-form-item prop="rank" label="排序">
                <el-input-number v-model="Form.rank" key="Form.rank" controls-position="right" style="width:100px;" min="1" max="maxRand"></el-input-number>
            </el-form-item>
            <el-form-item prop="fileListPic" ref="fileListPic">
                <span slot="label" class="mjb-required">列表图片</span>
                <el-upload v-bind:action="ImageUrl" size="small"
                            v-bind:before-upload="beforeUploadSpuImage1"
                            v-bind:success-handler="spuBigSuccessHandler"
                            v-bind:on-preview="previewSPUUploadImage2"
                            v-bind:limit="1"
                            v-bind:file-list.sync="Form.fileListPic">
                    <template slot-scope="item">
                        <mjb-image v-bind:src="item.url"></mjb-image>
                    </template>
                </el-upload>
                <div class="text-warning" style="font-size:12px">文件不能超过1M，只支持JPG,格式.图片上传大小：750*300</div>
                <div id="file_error" v-if="Form.fileListPic.length<=0&&firstSubmit" class="el-form-item__error">请上传一张列表图片</div>
            </el-form-item>
            <el-form-item prop="isHomeShow" label="首页展示" v-if="module==1">
                <el-checkbox v-model="Form.isHomeShow">是</el-checkbox>
            </el-form-item>

            <el-form-item label="类型" prop="mainPagePicType" v-if="Form.isHomeShow&&module==1" v-bind:inline-message="true">
                <el-select v-model="Form.mainPagePicType" auto-bind v-on:change="typeChange()">
                    <el-option slot="items" slot-scope="prop" v-bind:value="prop.value" v-bind:label="prop.label"></el-option>
                </el-select>
                <div id="file_error" v-if="Form.fileHomeShowPic.length<=0&&firstSubmit" class="el-form-item__error">请选择类型</div>
            </el-form-item>
            <el-form-item label="展示位" prop="mainPagePlace" v-if="Form.isHomeShow&&module==1" v-bind:inline-message="true">
                <el-select v-model="Form.mainPagePlace" auto-bind>
                    <el-option slot="items" slot-scope="prop" v-bind:value="prop.value" v-bind:label="prop.label"></el-option>
                </el-select>
                <div id="file_error" v-if="Form.fileHomeShowPic.length<=0&&firstSubmit" class="el-form-item__error">请选择展示位</div>
            </el-form-item>

            <el-form-item v-if="Form.isHomeShow&&module==1" ref="fileHomeShowPic" prop="fileHomeShowPic">
                <span slot="label" class="mjb-required" v-if="module==1">首页展示图</span>
                <el-upload v-bind:action="ImageFirstUrl" size="small"
                            v-bind:before-upload="beforeUploadSpuImage2"
                            v-bind:success-handler="spuBigSuccessHandler"
                            v-bind:on-preview="previewSPUUploadImage3"
                            v-bind:limit="1"
                            v-bind:file-list.sync="Form.fileHomeShowPic">
                    <template slot-scope="item">
                        <mjb-image v-bind:src="item.url"></mjb-image>
                    </template>
                </el-upload>
                <div class="text-warning" style="font-size:12px">上传图片前先选择图片类型,图片不能超过1M，只支持JPG格式.大图片上传大小：448*300,小图片上传大小：210*140</div>
                <div id="file_error" v-if="Form.fileHomeShowPic.length<=0&&firstSubmit" class="el-form-item__error">请上传一张首页展示图</div>
            </el-form-item>
            <el-form-item >
                <div v-if="isBrandEdit">
                    <label class="control-label">商品名称:</label>
                    <div class="mjb-ibk">
                        <el-autocomplete v-model="Form.productName"
                                        v-bind:fetch-suggestions="queryGoods"
                                        placeholder="请输入内容"
                                        v-on:select="goodsSelect" style="width:300px">
                        </el-autocomplete>
                    </div>
                    <button type="button" class="el-button el-button--primary el-button--mini mjb-mleft-10" id="btnBrandSearch" v-on:click="btnBrandSearch()"><i class="fa fa-search"></i><span>查询</span></button>
                </div>
                <div>
                    <mjb-table v-bind:parentData="tableGoodsDataSource" ref="goodsTable" v-on:cell-dblclick="cellGoodsDblclick"
                              style="width:500px" border stripe pager v-bind:page-size="30">
                        <el-table-column prop="SpuId" label="SPUID" width="110"></el-table-column>
                        <el-table-column prop="SpuName" label="Spu名称" min-width="200" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="StatusName" label="状态" width="100"></el-table-column>
                        <el-table-column prop="Rank" label="排序" width="90" v-if="isBrandEdit">
                            <template slot-scope="scope">
                                <div v-for="item in scope" :key="item.Rank">
                                    <el-tooltip content="双击可修改" placement="left">
                                        <div v-if="!item.GoodsCellIsEdit">
                                            {{item.Rank}}
                                        </div>
                                        <div v-show="item.GoodsCellIsEdit">
                                            <el-input v-model="item.Rank" v-on:blur="GoodsInputBlur(scope.row)" type="number"></el-input>
                                        </div>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                    </mjb-table>
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="text-right">
            <el-button v-on:click="dialogBrand=false" id="btnCancel">取消</el-button>
            <el-button type="primary" id="btnAddSure">确定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'pms2',
  data () {
    var that = this
    return {
      brand: '', // 品牌
      brandSource: this.DataSource({
        parseData: function (d) {
          return d.List
        },
        transport: {
          name: 'product-getBrandList'
        }
      }),
      moduleInfo: 'handpick', // handpick
      module: 1,
      handpickTableSource: this.DataSource({
        parseData: function (d) {
          return d.List
        },
        transport: {
          name: 'BrandOperation-GetBrandOperationList',
          data: this._.partial(that.getFilterData, 1)
        }
      }),
      recommendTableSource: this.DataSource({
        parseData: function (d) {
          return d.List
        },
        transport: {
          name: 'BrandOperation-GetBrandOperationList',
          data: this._.partial(that.getFilterData, 2)
        }
      }),

      typeSource: this.DataSource({
        data: [{ value: 1, label: '大图' }, { value: 2, label: '小图' }]
      }),

      dispalySource: this.DataSource({
        data: [{ value: 1, label: '第一幅展示' }, { value: 2, label: '第二幅展示' }]
      }),

      hotSellBrandTableSource: this.DataSource({
        parseData: function (d) {
          this.$post({
            name: 'BrandOperation-GetCover',
            data: {
              Type: 2,
              CoverId: this.module
            }
          }).then(function (item) {
            if (item.List.length > 0) {
              this.fileList = []
              if (item.List[0] != null) {
                this.fileList.push({ 'name': item.List[0].Pic, 'PicName': item.List[0].Pic, 'url': item.List[0].Path + '/' + item.List[0].Pic })
              }
            }
          })

          return d.List
        },
        transport: {
          name: 'BrandOperation-GetBrandOperationList',
          data: this._.partial(that.getFilterData, 3)
        }
      }),
      manTitle: '品牌运营管理',
      subhead: '',
      ImgPreviewdialog: false,
      dialogImageUrls: [],
      ImageUrl: this.configs.pms['BrandOperation-UploadBrandOperationListPic'],
      ImageFirstUrl: this.configs.pms['BrandOperation-UploadBrandOperationHomePic'],
      HotImageUrl: this.configs.pms['BrandOperation-UploadBrandOperationHotPic'],
      fileList: [],
      dialogBrand: false,
      ID: 0,
      orgRank: 0,
      uploadType: 0,
      brandId: '',
      maxRand: 0,
      isBrandEdit: false,
      rankAscending: false,
      dialogVisible: false,
      findSpu: false,
      Form: {
        brandId: 0,
        brandName: '',
        BrandSubtitle: '',
        rank: '',
        fileListPic: [],
        isHomeShow: false,
        fileHomeShowPic: [],
        spuID: 0,
        productName: '',
        mainPagePicType: '',
        mainPagePlace: ''
      },
      FormRules: {
        brandId: [{
          required: true,
          message: '请输入品牌名称',
          trigger: 'blur',
          validator: function (rule, value, callback) {
            if (value == 0 || value == '') {
              return callback(new Error('请输入品牌名称'))
            }
            callback()
          }
        }],
        brandName: [{
          required: true,
          message: '请输入品牌名称',
          trigger: 'blur',
          validator: function (rule, value, callback) {
            if (value == '') {
              return callback(new Error('请输入品牌名称'))
            }
            callback()
          }
        }],
        rank: [
          { required: true, message: '排序不能为空' },
          {
            validator: function (rule, value, callback) {
              var plusNumber = /^[1-9]\d*$/
              if (!plusNumber.test(value)) {
                callback(new Error('排序必须为正整【不含0】!'))
              }
              callback()
            }
          }
        ]
      },
      tableGoodsDataSource: this.DataSource({
        parseData: function (d) {
          return d.List
        },
        data: function (data, resolve, reject) {
          if (this.findSpu == false) {
            this.$post({
              name: this.isBrandEdit == true ? 'BrandOperation-GetBrandChoicenessDetailList' : 'product-GetSpuFromBrand',
              data: this.extend({
                Id: this.isBrandEdit == true ? this.ID : this.brandId
              }, data),
              inShowLoading: false,
              isCustomerError: true
            }).then(resolve, reject)
          } else {
            this.findSpu = false
            this.$post({
              name: 'BrandOperation-GetBrandChoicenessDetailList',
              data: this.extend({
                Id: this.ID,
                spuId: this.Form.SpuID
              }, data),
              inShowLoading: false,
              isCustomerError: true
            }).then(resolve, reject)
          }
        },
        server: false
      }),
      firstSubmit: false,
      position: null,
      arrow: null
    }
  },
  methods: {
    // 模块筛选
    radioSearch: function (status) {
      this.modelStatus = status
      this.tableSource.read()
    },
    onModuleInfo: function (tab, event) {
      if (tab.index == '0') {
        this.moduleInfo = 'handpick'
        this.module = 1
        this.handpickTableSource.query()
      } else if (tab.index == '1') {
        this.moduleInfo = 'recommend'
        this.module = 2
        this.recommendTableSource.query()
      } else {
        this.moduleInfo = 'hotSellBrand'
        this.module = 3
        this.hotSellBrandTableSource.query()
      }
    },
    sortChange: function (obj) {
      this.rankName = obj.prop
      this.rankAscending = obj.order == 'ascending'
      // TODO 修改之后表格刷新，应该有重新排序
      this.handpickTableSource.read()
      this.recommendTableSource.read()
      this.hotSellBrandTableSource.read()
    },
    cellGoodsDblclick: function (row, column, cell, event) {
      // 当前是编辑状态下，执行$nextTick函数让文本框聚焦
      row.GoodsCellIsEdit = true
      this.orgRank = row.Rank
      this.$nextTick(function () {
        // $(event.target).children().find('input').focus()
      })
    },
    GoodsInputBlur: function (row) {
      var plusNumber = /^[1-9]\d*$/
      if (!plusNumber.test(row.Rank)) {
        row.Rank = this.orgRank
        this.orgRank = 0
        row.GoodsCellIsEdit = false
        this.msgbox({ type: 'error', title: '排序值', message: '排序值只能输入大于0的整数' })
        return false
      }
      this.$post({
        name: 'BrandOperation-UpdateBrandChoicenessDetail',
        data: {
          ID: row.ID,
          Rank: row.Rank
        },
        inShowLoading: true
      }).then(function (d) {
        row.CellIsEdit = false
        this.message.success('操作成功')
        this.tableGoodsDataSource.query()
      })
    },
    // 单元格双击事件
    cellDblclick: function (row, column, cell, event) {
      // 当前是编辑状态下，执行$nextTick函数让文本框聚焦
      row.CellIsEdit = true
      this.$nextTick(function () {
        // $(event.target).children().find('input').focus()
        this.orgRank = row.Rank
      })
    },
    // 排序文本框失焦事件
    SupplyPriceInputBlur: function (row) {
      var plusNumber = /^[1-9]\d*$/
      var that = this
      if (!plusNumber.test(row.Rank)) {
        row.Rank = this.orgRank
        this.orgRank = 0
        row.CellIsEdit = false
        this.msgbox({ type: 'error', title: '排序值', message: '排序值只能输入大于0的整数' })
        return false
      }
      this.$post({
        name: 'BrandOperation-RankBrandOperation',
        data: {
          ID: row.ID,
          Rank: row.Rank
        },
        inShowLoading: true
      }).then(function (d) {
        this.message.success('操作成功')
        row.CellIsEdit = false
        // TODO 修改之后表格刷新，应该有重新排序
        switch (that.module) {
          case 1:
            this.handpickTableSource.read()
            break
          case 2:
            this.recommendTableSource.read()
            break
          case 3:
            this.hotSellBrandTableSource.read()
            break
        }
      })
    },
    // 上传文件超出个数限制时的钩子
    picExceed: function (file, fileList) {
      this.message.warning('只能添加一份发票文件')
    },
    queryBrand: function (queryString, cb) {
      if (queryString != '') {
        this.getRequest({
          name: 'Brand-GetBrandFromTitle',
          data: {
            title: queryString,
            choicenessType: this.module
          },
          inShowLoading: false
        }).then(function (d) {
          if (d.List != null) {
            cb(d.List)
          } else {
            // cb([])
          }
        })
      } else {
        // cb([])
      }
    },
    BrandSelect: function (item) {
      //                       this.SpuID = item.SpuID;
      this.brandId = item.SpuID
      this.Form.brandId = item.SpuID
      //                        this.skuData.read({
      //                           SpuID: item.SpuID
      //                        })
      this.tableGoodsDataSource.read()
    },
    queryGoods: function (queryString, cb) {
      if (queryString != '') {
        this.getRequest({
          name: 'product-getSpuList',
          data: {
            title: queryString,
            BrandId: this.Form.brandId
          },
          inShowLoading: false
        }).then(function (d) {
          if (d.List != null) {
            cb(d.List)
          } else {
            // cb([])
          }
        })
      } else {
        // cb([])
      }
    },
    goodsSelect: function (item) {
      var form = this.Form
      this.findSpu = true
      form.SpuID = item.SpuID
      if (form.productName == '') { form.spuID = 0 }
      this.tableGoodsDataSource.read()
    },
    btnBrandSearch: function () {
      this.tableGoodsDataSource.read()
    },
    typeChange: function () {
      if (this.Form.fileHomeShowPic.length > 0) {
        this.Form.fileHomeShowPic = []
      }
    },
    beforeUploadSpuImage0: function (file) {
      if (file.type != 'image/jpeg') {
        this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片非jpg格式' })
        return false
      }
      // 横屏大图1，展示图3
      if (file.size > (1 * 1024 * 1024)) {
        this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片太大,请确保1MB以内' })
        return false
      }
      /* return $.Deferred(function (deferred) {
        if (window.URL && window.URL.createObjectURL) {
          var imgSrc = window.URL.createObjectURL(file)
          var img = new Image()
          img.onload = function () {
            if (img.width != 210 || img.height != 280) {
              this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片不合规定,宽高210*280和文件1MB以内' })
              deferred.reject()
              this.hotSellBrandTableSource.query()
              return false
            }
            window.URL.revokeObjectURL(this.src)
            deferred.resolve(file)
          }
          this.uploadType = 1
          img.src = imgSrc
        } else {
          deferred.resolve(file)
        }
      }) */
    },
    beforeUploadSpuImage1: function (file) {
      if (file.type != 'image/jpeg') {
        this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片非jpg格式' })
        return false
      }
      // 横屏大图1，展示图3
      if (file.size > (1 * 1024 * 1024)) {
        this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片太大,请确保1MB以内' })
        return false
      }
      /* return $.Deferred(function (deferred) {
        if (window.URL && window.URL.createObjectURL) {
          var imgSrc = window.URL.createObjectURL(file)
          var img = new Image()
          img.onload = function () {
            if (img.width != 750 || img.height != 300) {
              this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片不合规定,宽高750*300和文件1MB以内' })
              deferred.reject()
              return false
            }
            window.URL.revokeObjectURL(this.src)
            deferred.resolve(file)
          }
          this.uploadType = 2
          img.src = imgSrc
        } else {
          deferred.resolve(file)
        }
      }) */
    },
    beforeUploadSpuImage2: function (file) {
      if (this.Form.mainPagePicType == '' || this.Form.mainPagePicType == null) {
        this.msgbox({ type: 'error', title: '图片上传', message: '请先选择图片类型' })
        return false
      }

      if (file.type != 'image/jpeg') {
        this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片非jpg格式' })
        return false
      }
      // 横屏大图1，展示图3
      if (file.size > (1 * 1024 * 1024)) {
        this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片太大,请确保1MB以内' })
        return false
      }
      /* return $.Deferred(function (deferred) {
        if (window.URL && window.URL.createObjectURL) {
          var imgSrc = window.URL.createObjectURL(file)
          var img = new Image()
          img.onload = function () {
            if (this.Form.mainPagePicType == 1) {
              if (img.width != 448 || img.height != 300) {
                this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片不合规定,宽高448*300和文件1MB以内' })
                deferred.reject()
                return false
              }
            } else if (this.Form.mainPagePicType == 2) {
              if (img.width != 210 || img.height != 140) {
                this.msgbox({ type: 'error', title: '图片上传', message: '你上传的图片不合规定,宽高210*140和文件1MB以内' })
                deferred.reject()
                return false
              }
            }

            window.URL.revokeObjectURL(this.src)
            deferred.resolve(file)
          }
          this.uploadType = 3
          img.src = imgSrc
        } else {
          deferred.resolve(file)
        }
      }) */
    },
    spuBigSuccessHandlerHot: function (res, file, files) {
      this.addUploadSuccessData(res, file, files, 1)
      this.$post({
        name: 'BrandOperation-SaveCover',
        data: {
          CoverId: this.module,
          Type: 2,
          Pic: file.PicName
        }
      }).then(function (d) {
        if (this.uploadType == 1) {
          this.message.warning('封面图片上传成功!')
        } else if (this.uploadType == 2) {
          this.message.warning('列表图片上传成功!')
        } else if (this.uploadType == 3) {
          this.message.warning('首页展示图上传成功!')
        }
      })
    },
    spuBigSuccessHandler: function (res, file, files) {
      this.addUploadSuccessData(res, file, files, 1)
      // if (this.module == 3) {
      // this.$post({
      //    name: "BrandOperation-SaveCover",
      //    data: {
      //        CoverId: this.module,
      //        Type: 2,
      //        Pic: file.PicName,
      //    },
      // }).then(function (d) {
      //    if (this.uploadType == 1) {
      //        this.message.warning('封面图片上传成功!');
      //    } else if (this.uploadType == 2) {
      //        this.message.warning('列表图片上传成功!');
      //    } else if (this.uploadType == 3) {
      //        this.message.warning('首页展示图上传成功!');
      //    }
      // });
      // } else {
      if (this.uploadType == 1) {
        this.message.warning('封面图片上传成功!')
      } else if (this.uploadType == 2) {
        this.message.warning('列表图片上传成功!')
      } else if (this.uploadType == 3) {
        this.message.warning('首页展示图上传成功!')
        // }
      }
    },
    addUploadSuccessData: function (response, file, files, type) {
      if (response.retBody.Status > 0) {
        file.ID = 0
        file.PicType = type
        file.PicName = response.retBody.FilePath
        file.PreviewUrl = response.retBody.PreviewUrl
      } else {
        file.status = 'fail'
        this.alert(response.retBody.Msg, {
          type: 'warning'
        })
      }
    },
    // 图片预览
    previewSPUUploadImage: function (file) {
      this.previewImage(this._.map(this.fileList, 'url'), file.url)
    },
    previewSPUUploadImage2: function (file) {
      this.previewImage(this._.map(this.Form.fileListPic, 'url'), file.url)
    },
    previewSPUUploadImage3: function (file) {
      this.previewImage(this._.map(this.Form.fileHomeShowPic, 'url'), file.url)
    },
    previewImageCarousel: function (sourceKey, imageKey, currentUrl) {
      var picUrl = []
      picUrl[0] = currentUrl
      this.previewImage(picUrl, currentUrl)
    },
    btnEdit: function (row) {
      var that = this
      that.dialogBrand = true
      that.subhead = '编辑品牌'

      that.Form.brandId = ''
      that.Form.brandName = ''
      that.Form.rank = ''
      that.Form.fileListPic = []
      that.Form.isHomeShow = ''
      that.Form.fileHomeShowPic = []
      that.Form.mainPagePicType = ''
      that.Form.mainPagePlace = ''

      // that.resetFormFields();
      that.isBrandEdit = false
      that.ID = row.ID
      that.Form.brandId = row.BrandId
      that.Form.brandName = row.BrandName
      that.Form.BrandSubtitle = row.BrandSubtitle
      that.Form.rank = row.Rank
      that.Form.fileListPic.push({ 'name': row.ListPagePic, 'PicName': row.ListPagePic, 'url': row.ListPath + row.ListPagePic })
      that.Form.isHomeShow = row.MainpageDisplayStatus
      if (that.Form.isHomeShow) {
        that.Form.fileHomeShowPic.push({ 'name': row.MainpagePic, 'PicName': row.MainpagePic, 'url': row.MainPath + row.MainpagePic })
      } else {
        that.Form.fileHomeShowPic.push({ 'name': '', 'PicName': '', 'url': '' })
      }
      that.brandId = row.BrandId

      that.Form.mainPagePicType = row.MainPagePicType
      that.Form.mainPagePlace = row.MainPagePlace

      this.$nextTick(function () {
        this.tableGoodsDataSource.query()
      })
    },
    btnDelete: function (row) {
      var that = this
      this.$post({
        name: 'BrandOperation-DeleteBrandOperation',
        data: {
          ChoicenessId: row.ID
        }
      }).then(function (d) {
        that.handpickTableSource.read()
        that.recommendTableSource.read()
        that.hotSellBrandTableSource.read()
      })
    },

    /* successPic: function (data, fileList, ID) {
      if (response.retBody.Status > 0) {
        file.ID = 0
        file.PicType = type
        file.PicName = response.retBody.FilePath
        file.PreviewUrl = response.retBody.PreviewUrl
      } else {
        file.status = 'fail'
        this.alert(response.retBody.Msg, {
          type: 'warning'
        })
      }
    }, */
    btnAddBrand: function () {
      this.dialogBrand = true
      this.isBrandEdit = false

      this.ID = 0
      this.Form.brandId = ''
      this.Form.brandName = ''
      this.Form.rank = ''
      this.Form.fileListPic = []
      this.Form.isHomeShow = ''
      this.Form.fileHomeShowPic = []
      this.Form.mainPagePicType = ''
      this.Form.mainPagePlace = ''
      this.brandId = 0
      //            this.tableGoodsDataSource.query();
      //            that.resetFormFields();

      this.subhead = '新增品牌'
      this.getRequest({
        name: 'BrandOperation-GetMaxRand',
        data: {
          type: this.module
        },
        inShowLoading: false
      }).then(function (d) {
        this.maxRand = d.ID + 1
        this.Form.rank = d.ID + 1
      })
    },
    btnAddSure: function () {
      var that = this.Model
      that.firstSubmit = true
      that.$refs.FormTable.validate(function (valid) {
        if (valid) {
          var path = ''
          if (that.Form.isHomeShow == true) {
            if (that.Form.fileHomeShowPic.length > 0 && that.Form.fileHomeShowPic[0].PicName != '') {
              path = that.Form.fileHomeShowPic[0].PicName
            } else {
              this.message.warning('首页图片必须上传!')
              return false
            }
            if (that.Form.mainPagePicType == null || that.Form.mainPagePicType == '') {
              that.Form.mainPagePicType = ''
              this.message.warning('请选择类型!')
              return false
            }
            if (that.Form.mainPagePlace == null || that.Form.mainPagePlace == '') {
              that.Form.mainPagePlace = ''
              this.message.warning('请选择展示位!')
              return false
            }
          } else {
            that.Form.mainPagePicType = ''
            that.Form.mainPagePlace = ''
            path = ''
          }
          if (that.Form.brandId == 0 || that.Form.brandId == '') {
            that.Form.brandName = ''
            this.message.warning('请输入正确的品牌!')
            return false
          }
          // if (that.Form.isHomeShow == true) {
          //    if (that.Form.mainPagePicType == 0 || that.Form.mainPagePicType == "") {
          //        that.Form.mainPagePicType = "";
          //        this.message.warning('请选择类型!');
          //        return false;
          //    }
          //    if (that.Form.mainPagePlace == 0 || that.Form.mainPagePlace == "") {
          //        that.Form.mainPagePlace = "";
          //        this.message.warning('请选择显示位!');
          //        return false;
          //    }
          // } else {
          //    that.Form.mainPagePicType = "";
          //    that.Form.mainPagePlace = "";
          // }

          this.$post({
            name: this.configs.pms['BrandOperation-SaveBrandOperation'],
            data: {
              ID: that.ID,
              ChoicenessType: that.module,
              BrandId: that.brandId,
              Rank: that.Form.rank,
              MainpagePic: path,
              ListPagePic: that.Form.fileListPic[0].PicName,
              MainpageDisplayStatus: that.Form.isHomeShow,
              DelFlag: false,
              MainPagePicType: that.Form.mainPagePicType,
              MainPagePlace: that.Form.mainPagePlace
            }
          }).then(function (d) {
            that.dialogBrand = false
            this.message.success('保存成功')
            that.handpickTableSource.read()
            that.recommendTableSource.read()
            that.hotSellBrandTableSource.read()
          })
        }
      })
    },
    // 查询
    btnSearch: function () {
      this.Model.handpickTableSource.read()
      this.Model.recommendTableSource.read()
      this.Model.hotSellBrandTableSource.read()
    },
    // 条件函数
    getFilterData: function (type) {
      return {
        BrandId: this.brand,
        BpType: type,
        RankAscending: this.rankAscending
      }
    },
    resetFormFields: function () {
      var that = this.Model
      if (that.$refs.FormTable) {
        that.$refs.FormTable.resetFields()
      }
    }
  },
  created () {
    // this.tableData.read()
  }
}
</script>

<style >
  .sku-image-button {
    text-align: center;
    height: 30px;
    margin-top: 18px;
  }

  .sku-image-button > span {
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
    margin-left: 5px;
  }

  .mjb-elupload.mjb-elupload-customWidth .el-upload-btn,
  .mjb-elupload.mjb-elupload-customWidth .el-upload-item,
  .mjb-elupload.mjb-elupload-customWidth .el-progress-circle {
    width: 48px !important;
    height: 48px !important;
  }

  .mjb-elupload-customWidth .el-upload-actions .el-upload-action-item > i {
    font-size: 14px;
  }
</style>
