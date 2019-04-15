<template>
  <div>
    <div class="mjb-search-container panel panel-default" v-cloak>
      <div class="panel-body">
          <div class="form-horizontal">
              <div class="form-group">
                  <label class="control-label mjb-label-word3">联系电话:</label>
                  <div class="mjb-ibk">
                      <el-input placeholder="请输入内容" v-model="keyword" maxlength="11"></el-input>
                  </div>
                  <button class="el-button el-button--primary el-button--mini mjb-mleft-10" id="btnSearch"><i class="fa fa-search"></i><span>搜索</span></button>
              </div>
              <div class="form-group">
                  <label class="control-label mjb-label-word3">状态:</label>
                  <mjb-radio-group v-model="status" v-on:change="dateSearch">
                      <el-radio-button name="status" v-bind:label="item.value" v-for="item in statusList" v-bind:key="item.value">{{item.label}}</el-radio-button>
                  </mjb-radio-group>
              </div>
          </div>
      </div>
    </div>
    <div class="mjb-content-container panel" v-cloak>
      <div class="panel-body">
          <div class="mjb-table-tools">
              <button class="el-button el-button--primary el-button--mini" v-on:click="onAdd"><i class="fa fa-plus-circle"></i> 新增</button>
          </div>
          <mjb-table v-bind:data-source="tableDataSource" auto-bind auto-height border stripe pager ref="table" v-bind:cell-click="viewMessage" style="width:100%">
              <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="ProdTitle" label="联系电话" width="120"></el-table-column>
              <el-table-column prop="SourceText" label="内容" v-bind:render-header="renderHeader" show-overflow-tooltip></el-table-column>
              <el-table-column prop="StatusText" label="状态" width="120"></el-table-column>
              <el-table-column prop="CreatorName" label="发送时间" width="120"></el-table-column>
              <el-table-column prop="PhoneNumber" label="操作人" width="120"></el-table-column>
              <el-table-column label="操作" width="150">
                  <div slot-scope="scope">
                      <div class="mjb-table-buttons">
                          <button class="el-button el-button--text el-button--mini" v-on:click="onResend(scope.row)">重新发送</button>
                          <button class="el-button el-button--text el-button--mini" v-on:click="onEdit(scope.row)">编辑</button>
                          <button class="el-button el-button--text el-button--mini" v-on:click="onDel(scope.row)">删除</button>
                      </div>
                  </div>
              </el-table-column>
          </mjb-table>
      </div>
    </div>
  </div>
</template>
