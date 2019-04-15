export default {
  user: {
    'Login': 'portal/Account/AccountLogin', /// 登录
    'Logout': '/login/logout'
  },
  pms: {
    'Product-GetProductManageList': 'pms/Product/GetProductManageList', // 商品列表
    'Eleme-GetSpuStatusList': 'pms/Eleme/GetSpuStatusList', // 商品状态
    'Eleme-GetBrandList': 'pms/Eleme/GetBrandList', // 所有品牌
    'product-Test': 'Product/EditProductToPurchaser',
    // 商品管理页面
    'product-getProductManageList': 'Product/GetProductManageList', // 示例：http://hjb.pms.com/product/getProductManageList?PageIndex=1&PageSize=20
    'product-getSpuStatusList': 'Eleme/GetSpuStatusList', // 示例：http://hjb.pms.com/Eleme/GetSpuStatusList'
    'product-operation': 'Product/Operation', // 变更负责人、重新上架、下架、删除
    'product-getSpuLogList': 'OperatorLog/GetSpuLogList', // 查看日志 示例：http://hjb.pms.com/log/GetSpuLogList?spuid=11
    'product-getBrandList': 'Eleme/GetBrandList', // 获取品牌  http://hjb.pms.com/eleme/GetBrandList
    'product-getSortList': 'Eleme/GetSortList', // 获取分类  http://hjb.pms.com/eleme/GetSortList
    'product-getUnitList': 'Eleme/GetUnitList', // 获取单位  http://hjb.pms.com/eleme/GetUnitList
    'product-getSupplierList': 'Eleme/GetSupplierList', // 获取供应商  http://hjb.pms.com/eleme/GetSupplierList
    'product-getRegionList': 'Eleme/GetRegionList', // 获取区域  http://hjb.pms.com/eleme/RegionList  参数pid=0默认加载省份
    'product-getUserList': 'Eleme/GetUserList', // 获取用户  http://hjb.pms.com/eleme/GetUserList?key=彭东  参数queryName
    'product-GetSpuFromBrand': 'product/GetSpuFromBrand',
    'product-GetStoreList': 'Eleme/GetStoreList',
    'product-importInvoice': 'Product/ImportInvoice',

    // 商品新增，编辑，详情页面
    'product-getProductTemplateID': 'Product/GetProductTemplateID', // 上传商品图片：http://hjb.pms.com/Product/GetProductTemplateI?sortid=
    'product-uploadSpuDetailPic': 'Upload/UploadSpuDetailPic', // 上传商品详情图片：http://hjb.pms.com/Upload/UploadSpuDetailPic
    'product-uploadSpuPic': 'Upload/UploadSpuPic', // 上传商品图片：http://hjb.pms.com/Upload/UploadSpuPic?spuid=   响应字段：Status,Msg,FilePath
    'product-uploadSkuPic': 'Upload/UploadSkuPic', // 上传sku商品图片：http://hjb.pms.com/Upload/UploadSpuPic?spuid=&skuid   响应字段：Status,Msg,FilePath
    'product-getProductSpuDetail': 'Product/GetProductDetail', // 获取商品详情：http://hjb.pms.com/product/GetProductDetail?spuid=9608952
    'product-getProductSkuList': 'Product/GetProductSkuList', // 获取商品下面的sku信息：http://hjb.pms.com/product/GetProductDetail?spuid=1234
    'product-getProductTemplateSpec': 'Product/GetProductTemplateSpec', // 根据分类ID获取规格参数 需带参数sortid：http://hjb.pms.com/product/GetProductTemplateSpec?sortID=1349 当存在spuid需再传SpuID
    'product-getProductTemplateSku': 'Product/GetProductTemplateSku', // 根据分类ID获取sku属性 需带参数sortid：http://hjb.pms.com/product/GetProductTemplateSku?sortID=1349 当存在spuid需再传SpuID
    'product-addProductDelivery': 'ProductDelivery/Add', // 新增配送不到区域 http://hjb.pms.com/ProductDelivery/Add  参数：RegionID-配送不到区域ID，RegionName-配送不到区域名称
    'product-deleteProductDelivery': 'ProductDelivery/Delete', // 新增配送不到区域 http://hjb.pms.com/ProductDelivery/delele  参数：ID
    'product-getProductDeliveryList': 'ProductDelivery/GetList', // 获取配送不到区域列表信息 http://hjb.pms.com/ProductDelivery/GetList
    'product-getProductSpuDeliveryList': 'ProductDelivery/GetSpuList', // 根据商品id获取配送不到区域列表信息 http://hjb.pms.com/ProductDelivery/GetSpuList?spuid=1992  参数：spuID
    'product-getProductSpuSpec': 'Product/GetProductSpuSpec', // 根据商品标题获取规格参数 http://hjb.pms.com/Product/GetProductSpuSpec?title=魅族-单元测试&sortID=1406  参数：title ,sortID
    'product-saveProduct': 'Product/SaveProduct', // 提交商品编辑或者商品部门编辑基本信息 http://hjb.pms.com/Product/EditProductToEditor?model
    'product-saveProductDetail': 'Product/SaveProductDetail', // 商品部门编辑商品详情 http://hjb.pms.com/Product/EditProductToEditor?model
    'product-aduit': 'Product/Aduit', // 商品部门编辑商品详情 http://hjb.pms.com/Product/Aduit?ID&IsPass&Remark
    'product-shortNameList': 'Eleme/GetProdNameList', // 获取商品简称列表
    'Product-GetAttrIsUsed': 'Product/GetAttrIsUsed', // 判断特性是否可以删除 -- sku没有引用则可以删除 1：可以删除 0不能删除
    'Product-GetTemplineIdIsUsed': 'Product/GetTemplineIdIsUsed', // 判断销售属性是否可以新增销售属性值 1：可以删除 0不能删除
    'Product-GetIsExistsSku': 'Product/GetIsExistsSku', // 判断SPU下是否有SKU 1：有 0无
    'product-PurchaseAudit': 'Product/PurchaseAudit', // 采购审核  草稿状态->待采购审核状态
    'product-GetAllTradrulePic': 'Product/GetAllTradrulePic', // 获取商品购买须知
    // sku管理界面
    'productSku-getSkuManageList': 'ProductSku/GetProductSkuManageList', // 示例：http://hjb.pms.com/ProductSku/GetProductSkuManageList?PageIndex=1&PageSize=20
    'productSku-getSkuStatusList': 'Eleme/GetSkuStatusList', // 示例：http://hjb.pms.com/Eleme/GetSkuStatusList'
    'productSku-getSkuLogList': 'OperatorLog/GetSkuLogList', // 查看日志 示例：http://hjb.pms.com/log/GetSkuLogList?skuid=358
    'productSku-operation': 'ProductSku/Operation', // sku 重新销售、作废、修改库存、停止销售、作废、修改市场价、删除
    'productSku-getSupplierProduct': 'Eleme/GetSupplierProduct',
    'productSku-GetProductSkuDetail': 'ProductSku/GetProductSkuDetail', // sku 详情
    'productSku-SaveProductSkuDetail': 'ProductSku/SaveProductSkuDetail', // sku 详情编辑保存

    // 售价调整单管理
    'ProdAdjustApply-ApplyManage': 'ProdAdjust/ApplyManage',
    'ProdAdjustApply-Query': 'ProdAdjustApply/Query',
    'ProdAdjustApply-ApplyCreate': 'ProdAdjustApply/ApplyCreate',
    'ProdAdjustApply-SkuQuery': 'ProdAdjustApply/SkuQuery',
    'ProdAdjustApply-SpuQuery': 'ProdAdjustApply/SpuQuery',
    'ProdAdjustApply-SkuAdd': 'ProdAdjustApply/SkuAdd',
    'ProdAdjustApply-Save': 'ProdAdjustApply/Save',
    'ProdAdjustApply-GetApplyDetail': 'ProdAdjustApply/GetApplyDetail',
    'ProdAdjustApply-Approve': 'ProdAdjustApply/Approve',
    'ProdAdjustApply-Delete': 'ProdAdjustApply/Delete',
    'ProdAdjustApply-GetSkuSupPrice': 'ProdAdjustApply/GetSkuSupPrice',
    'ProdAdjustApply-GetApplyLog': 'ProdAdjustApply/GetApplyLog',
    'ProdAdjustApply-GetOperatorName': 'ProdAdjustApply/GetOperatorName',
    // 商品分类
    'Sort-SortList': 'Sort/SortList',
    'Sort-GetSortList': 'Sort/GetSortList',
    'Sort-SortEdit': 'Sort/SortEdit',
    'Sort-SaveSort': 'Sort/SaveSort',
    'Sort-GetSortById': 'Sort/GetSortById',
    'Sort-GetNodeLevel': 'Sort/GetNodeLevel',
    'Sort-DeleteSort': 'Sort/DeleteSort',
    'Sort-GetAttributeTemp': 'Sort/GetAttributeTemp',
    'Sort-GetIsExistsSortStoreProfit': 'Sort/GetIsExistsSortStoreProfit', // 判断分类是否设置了店主收益占比 1：设置 0没设置
    'Classify-GetFrontSortProductList': 'Classify/GetFrontSortProductList', // 获取分类商品信息
    'Classify-GetSelectFrontSortProductList': 'Classify/GetSelectFrontSortProductList', // 获取精选商品
    'Classify-OperateFrontSortProduct': 'Classify/OperateFrontSortProduct', // 操作精选商品

    // 单位管理
    'Unit-UnitList': 'Unit/UnitList',
    'Unit-GetUnitList': 'Unit/GetUnitList',
    'Unit-SaveUnit': 'Unit/SaveUnit',
    'Unit-DeleteUnit': 'Unit/DeleteUnit',
    // 品牌管理
    'Brand-BrandList': 'Brand/BrandList',
    'Brand-GetBrandList': 'Brand/GetBrandList',
    'Brand-SaveBrand': 'Brand/SaveBrand',
    'Brand-DeleteBrand': 'Brand/DeleteBrand',
    'Brand-GetBrandFromTitle': 'Brand/GetBrandFromTitle',
    'Brand-LogoPic': 'Upload/UploadBrandLogoPic',
    'Brand-BGPic': 'Upload/UploadBrandBackground',

    // 分享素材
    'ShareMaterial-ShareMaterialManage': 'ShareMaterial/ShareMaterialManage',
    'ShareMaterial-Query': 'ShareMaterial/Query',
    'ShareMaterial-Save': 'ShareMaterial/Save',
    'ShareMaterial-Approve': 'ShareMaterial/Approve',
    'ShareMaterial-Valid': 'ShareMaterial/Valid',
    'ShareMaterial-Delete': 'ShareMaterial/Delete',
    'Upload-UploadShareMaterial': 'Upload/UploadShareMaterial',
    'ShareMaterial-GetShareLog': 'ShareMaterial/GetShareLog',
    'ShareMaterial-QueryImport': 'ShareMaterial/QueryImport',
    'ShareMaterial-QueryExport': 'ShareMaterial/QueryExport',
    'ShareMaterial-BatchApprove': 'ShareMaterial/BatchApprove',
    'ShareMaterial-CopySpuPicToMaterialsShare': 'ShareMaterial/CopySpuPicToMaterialsShare',
    // 属性管理页面
    'attribute-manage': 'Attribute/GetAttributeManageList',
    'attribute-grouplist': 'Attribute/GetAttributeGroupList',
    'attributeGroup-save': 'Attribute/SaveAttributeGroup',
    'attributeTemphead-get': 'Attribute/GetAttributeTemp',
    'attributeTemphead-save': 'Attribute/SaveAttributeTemphead',

    /// Sku上架
    'productShelves-getlist': 'ProductShelves/QeruyApplyList',
    'productShelves-getAuditStatus': 'Eleme/GetSkuShleveStatusList',
    'product-getSpuList': 'Eleme/GetSPUList',
    'productShelvesEdit-getdata': 'ProductShelves/QueryByApplyId',
    'productShelvesEdit-save': 'ProductShelves/Save',
    'productShelves-Audit': 'ProductShelves/Audit',
    'productShelves-suppliersprice': 'Eleme/GetSupplierPrice',
    'productShelves-log': 'OperatorLog/GetSkuShelveApplyLogList',
    'productShelves-getskuByspuId': 'Eleme/GetSkuList',

    // 获取非特供商品
    'product-getNotStoreSelfSpuList': 'Eleme/GetNotStoreSelfSpuList',

    /// Banner 管理
    'banner-getlist': 'Banner/GetBannerList',
    'banner-uploadpic': 'Upload/UploadBannerPic',
    'banner-save': 'Banner/SaveBanner',
    'bannertype-getlist': 'Eleme/GetBannerUrlTypeList',
    'banner-platformtypeinitdate': 'Banner/GetPlatformTypeInitDate',

    /// 前端分类数据
    'websort-getlist': 'Eleme/GetOperatorSortList',

    /// 推荐商品
    'recommendGoodsSpuStatus-getlist': 'Eleme/GetRecommendGoodsSpuStatus',
    'recommendGoods-getlist': 'RecommendProduct/QueryList',
    'recommendGoods-save': 'RecommendProduct/Save',

    // 京东比价
    'productSku-getJDParityList': 'ProductSku/GetJDParityList',
    'productSku-getPriceRatioType': 'ProductSku/GetPriceRatioType',

    /// sku停售
    'stopSaleReasonSource-getlist': 'StopSaleSku/GetStopSaleReasonTypeList',
    'stopSale-GetSkuStopList': 'StopSaleSku/GetSkuStopList',
    'stopSale-operationType': 'Eleme/GetOperationTypeList',

    // 品牌运营管理
    'BrandOperation-GetBrandOperationList': 'BrandOperation/GetBrandOperationList',
    'BrandOperation-UploadBrandOperationListPic': 'Upload/UploadBrandOperationListPic', // 品牌运营列表图片上传
    'BrandOperation-UploadBrandOperationHomePic': 'Upload/UploadBrandOperationHomePic', // 品牌运营首页图片上传
    'BrandOperation-UploadBrandOperationHotPic': 'Upload/UploadBrandOperationHotPic', // 品牌运营品牌热销封面
    'BrandOperation-SaveBrandOperation': 'BrandOperation/SaveBrandOperation',
    'BrandOperation-GetMaxRand': 'BrandOperation/GetMaxRand',
    'BrandOperation-GetBrandChoicenessDetailList': 'BrandOperation/GetBrandChoicenessDetailList',
    'BrandOperation-SaveCover': 'BrandOperation/SaveCover', // 上传封面
    'BrandOperation-GetCover': 'BrandOperation/GetCover',
    'BrandOperation-DeleteBrandOperation': 'BrandOperation/DeleteBrandOperation',
    'BrandOperation-RankBrandOperation': 'BrandOperation/RankBrandOperation',
    'BrandOperation-UpdateBrandChoicenessDetail': 'BrandOperation/UpdateBrandChoicenessDetail',

    // 模块专题管理
    'ModuleSpecial-GetFrontTopicList': 'ModuleSpecial/GetFrontTopicList',
    'ModuleSpecial-GetMaxRand': 'ModuleSpecial/GetMaxRand',
    'ModuleSpecial-Save': 'ModuleSpecial/Save',
    'ModuleSpecial-UploadActionOperationHotPic': 'Upload/UploadActionOperationHotPic', // 运营专题-热销榜
    'ModuleSpecial-UploadActionOperationMonthHotPic': 'Upload/UploadActionOperationMonthHotPic', // 运营专题-本月爆款
    'ModuleSpecial-Delete': 'ModuleSpecial/Delete',
    'ModuleSpecial-Get': 'ModuleSpecial/Get',
    'ModuleSpecial-GetList': 'ModuleSpecial/GetList',
    'ModuleSpecial-SaveBanner': 'ModuleSpecial/SaveBanner',
    'ModuleSpecial-Del': 'ModuleSpecial/Del',
    'ModuleSpecial-BannerState': 'ModuleSpecial/BannerState',
    'ModuleSpecial-UploadBanner': 'Upload/UploadModuleSpeciaBanner',

    // 运营系统 前端分类
    'frontSort-GetClassifyList': 'Classify/GetClassifyList',
    'frontSort-FindClassifyList': 'Classify/FindClassifyList',
    'frontSort-GetFrontMainShowList': 'Classify/GetFrontMainShowList',
    'frontSort-ModifyFrontMain': 'Classify/ModifyFrontMain',
    'frontSort-ModifyFrontSortShow': 'Classify/ModifyFrontSortShow',
    'frontSort-ModifyFrontSortRank': 'Classify/ModifyFrontSortRank',
    'frontSort-DelFrontSort': 'Classify/DelFrontSort',
    'operationscategory-uploadpic': 'Upload/UploadOperationsCategory',
    'frontSort-GetProdBrandList': 'Classify/GetProdBrandList',
    'frontSort-CreateEditFrontSort': 'Classify/CreateEditFrontSort',
    'frontSort-GetFrontSort': 'Classify/GetFrontSort',
    'frontSort-GetFrontSortLog': 'Classify/GetFrontSortLog',
    'frontSort-DelCateCache': 'Classify/DelCateCache',
    'frontSort-GetClassifyById': 'Classify/GetClassifyById',

    // 运营系统 热搜关键词管理
    'hotSearch-GetHotSearchList': 'HotSearch/GetHotSearchList', // 获取热搜关键词列表
    'hotSearch-DelHotSearch': 'HotSearch/DelHotSearch', // 删除热搜关键词
    'hotSearch-ModifyHotSearchRank': 'HotSearch/ModifyHotSearchRank', // 修改热搜关键词排序
    'hotSearch-GetProdSpuKeyWord': 'HotSearch/GetProdSpuKeyWord', // 修改热搜关键词排序
    'hotSearch-AddHotSearchKeyWord': 'HotSearch/AddHotSearchKeyWord', // 新增热搜关键词排序

    // 运营系统 广告位管理
    'adVert-GetAdVertList': 'AdVert/GetAdVertList', // 取广告位列表
    'adVert-ModifyAdVertRank': 'AdVert/ModifyAdVertRank', // 修改广告位排序
    'adVert-DelAdVert': 'AdVert/DelAdVert', // 删除广告位
    'adVert-UploadAdvertis': 'AdVert/UploadAdvertis', // 上传
    'adVert-GetAdVert': 'AdVert/GetAdVert', // 详情
    'adVert-UploadPic': 'Upload/UploadAdvertPic', // 广告上传
    'adVert-GetSpuPageList': 'Eleme/GetSpuPageList', // 添加商品页面
    'adVert-SaveAdvert': 'AdVert/SaveAdvert', // 保存
    'adVert-GetAdvertSpuList': 'AdVert/GetAdvertSpuList',

    // 帮助中心-问题分类
    'QASort-GetQASortList': 'HelpCenter/GetQASortList', // 获取问题分类集合
    'QASort-FindQASortList': 'HelpCenter/FindQASortList', // 获取问题分类列表
    'QASort-AddEditQASort': 'HelpCenter/AddEditQASort', // 新增或者修改问题分类
    'QASort-GetQASort': 'HelpCenter/GetQASort', // 获取问题分类
    'QASort-DelQASort': 'HelpCenter/DelQASort', // 删除问题分类
    'QASort-ModifyQASortRank': 'HelpCenter/ModifyQASortRank', // 修改问题分类排序
    // 帮助中心-问题分类详情
    'QASort-GetQADetailsList': 'HelpCenter/GetQADetailsList', // 获取问题分类详情列表
    'QASort-GetQADetail': 'HelpCenter/GetQADetail', // 获取问题分类详情
    'QASort-DelQADetail': 'HelpCenter/DelQADetail', // 删除问题分类详情
    'QASort-AddEditQADetail': 'HelpCenter/AddEditQADetail', // 新增或者编辑问题分类详情
    'QASort-EditEnableQADetail': 'HelpCenter/EditEnableQADetail', // 启用还是禁用问题分类详情
    'QASort-ModifyQADetailRank': 'HelpCenter/ModifyQADetailRank', // 修改问题分类详情排序
    'QASort-GetCascadeData': 'HelpCenter/GetCascadeData', // 获取一二级级联数据
    'QASort-uploadQADetailPic': 'Upload/UploadQADetailPic', // 上传帮助中心详情图片
    'QASort-DelCateCache': 'HelpCenter/DelCateCache', // 清除缓存

    'adVert-ModifyAdVertDetailRank': 'AdVert/ModifyAdVertDetailRank', // 修改广告位关联排序

    // 满金店学院-banner图
    'mjdSchool-banner': 'CollegeBanner/GetList',
    'mjdSchool-banner-save': 'CollegeBanner/Save',
    'mjdSchool-banner-url-list': 'CollegeBanner/GetBannerUrlTypeList',
    'mjdSchool-banner-setState': 'CollegeBanner/BannerState',
    'mjdSchool-banner-del': 'CollegeBanner/Del',
    'mjdSchool-banner-img': 'Upload/UploadCollegeBannerPic',
    'mjdSchool-banner-rank': 'CollegeBanner/BannerRank',

    // 满金店学院-文章分类
    'mjdSchool-article-sort': 'CollegeArticleSort/GetList',
    'mjdSchool-article-sort-save': 'CollegeArticleSort/Save',
    'mjdSchool-article-sort-icon': 'Upload/UploadCollegeArticleSortIcon',
    'mjdSchool-article-sort-del': 'CollegeArticleSort/Del',
    'mjdSchool-article-sort-show': 'CollegeArticleSort/ArticleSortShow',
    'mjdSchool-article-sort-rank': 'CollegeArticleSort/ArticleSortRank',

    // 满金店学院-文章管理
    'collegeArticle-getList': 'CollegeArticle/GetList',
    'collegeArticle-getDetailbyId': 'CollegeArticle/Get',
    'collegeArticle-getOperatorList': 'CollegeArticle/GetOperatorList',
    'upload-uploadCollegeArticlePic': 'Upload/UploadCollegeArticlePic',
    'collegeArticle-save': 'CollegeArticle/Save',
    'collegeArticle-articleState': 'CollegeArticle/ArticleState',
    'collegeArticle-delArticle': 'CollegeArticle/Del',
    'collegeArticle-articleRank': 'CollegeArticle/ArticleRank',

    // 满金店学院-精选推荐
    'mjdSchool-recommend-img': 'Upload/UploadCollegeArticleTopIcon',
    'mjdSchool-top-list': 'CollegeArticle/GetArticleTopList',
    'mjdSchool-recommend-article': 'CollegeArticle/ArticleRecommend',
    'mjdSchool-recommend-settop': 'CollegeArticle/ArticleTop',
    'mjdSchool-recommend-setRank': 'CollegeArticle/ArticleRecommendRank',

    // 活动专题
    'activity-Get': 'Activity/Get',
    'activity-GetList': 'Activity/GetList',
    'activity-Save': 'Activity/Save',
    'activity-ActivityRank': 'Activity/ActivityRank',
    'activity-Delete': 'Activity/Delete',
    'activity-ActivityState': 'Activity/ActivityState',
    'activity-PageLarge': 'Upload/UploadActivityPageLarge',
    'activity-PageMiddle': 'Upload/UploadActivityPageMiddle',
    'activity-PageSmall': 'Upload/UploadActivityPageSmall',
    'activity-PageBackground': 'Upload/UploadActivityPageBackground',
    'activity-GetSpuByTitleOrSpuId': 'Product/GetSpuByTitleOrSpuId',
    'activity-tabs-Get': 'ActivityTabs/Get',
    'activity-tabs-GetList': 'ActivityTabs/GetList',
    'activity-tabs-Save': 'ActivityTabs/Save',
    'activity-tabs-Delete': 'ActivityTabs/Delete',
    'activity-goods-GetList': 'ActivityGoods/GetList',
    'activity-goods-Save': 'ActivityGoods/Save',
    'activity-goods-Delete': 'ActivityGoods/Delete',
    'activity-goods-ActivityGoodsShow': 'ActivityGoods/ActivityGoodsShow',
    'activity-UploadActivityShare': 'Upload/UploadActivityShare',
    // 一元购活动
    'yyg-GetList': 'ProductActivity/GetList',
    'yyg-ActivityState': 'ProductActivity/ActivityState',
    'yyg-ActivityAlternative': 'ProductActivity/ActivityAlternative',
    'yyg-ActivityRank': 'ProductActivity/ActivityRank',
    // 限时抢购活动
    'limitActivity-GetList': 'limitActivity/GetList', // 获取列表
    'limitActivity-Get': 'limitActivity/Get', // 获取详情
    'limitActivity-Save': 'limitActivity/LimitActivitySave', // 保存活动
    'limitActivity-SaveLine': 'limitActivity/LimitActivitySaveLine', // 保存活动详情
    'limitActivity-State': 'limitActivity/LimitActivityState', // 停用、启用
    'limitActivity-Remove': 'limitActivity/LimitActivityRemove', // 移除
    'limitActivity-GetStock': 'limitActivity/LimitActivityGetStock', // 获取可选活动商品
    'limitActivity-Rank': 'limitActivity/LimitActivityLineRank', // 排序
    'limitActivity-SaveQuantity': 'limitActivity/LimitActivitySaveQuantity', // 修改数量
    // 个性化商品
    /* 'Get-GetCertTypeList': getAbsoluteUrl('scm/ProductCert/GetCertTypeList'), // 获取资质类型
    'Get-GetProList': getAbsoluteUrl('scm/ProductCert/GetProList'), // 获取资质类型
    'Upload-Cert': getAbsoluteUrl('SCM/ProductCert/Upload'),
    'Save-Cert': getAbsoluteUrl('scm/ProductCert/Save'),
    'Product-SaveSupplier': 'Product/SaveSupplier',
    'SupProApply-GetSupProApply': getAbsoluteUrl('scm/SupProApply/GetSupProApply'),
    'ProductCert-GetCertList': getAbsoluteUrl('scm/ProductCert/GetCertList'), */

    // 新品申请
    'ProductApply-FindProductApply': 'ProductApply/FindProductApply', // 查询申请列表
    'ProductApply-GetProdApplyById': 'ProductApply/GetProdApplyById', // 根据商品申请ID,获取信息
    'ProductApply-AddProductApply': 'ProductApply/AddProductApply', // 新增商品申请
    'ProductApply-EditProductApply': 'ProductApply/EditProductApply', // 编辑商品申请
    'ProductApply-FindProductApplyLog': 'ProductApply/FindProductApplyLog', // 查询商品申请日志
    'ProductApply-EditProdApplyStatus': 'ProductApply/EditProdApplyStatus', // 审核商品，改变状态
    'Product-ModifyProdAuditStatus': 'Product/ModifyProdAuditStatus', // 修改产品编辑审核状态
    'Upload-UploadProdApplyPic': 'Upload/UploadProdApplyPic', // 上传商品申请图片，展示图片
    'Upload-UploadProdApplyIntroPic': 'Upload/UploadProdApplyIntroPic' // 上传商品申请图片，详情图片
  }
}
