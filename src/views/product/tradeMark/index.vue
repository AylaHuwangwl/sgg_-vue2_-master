<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="序号" align="center" width="width">
      </el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        align="center"
        width="width"
      >
        <template slot-scope="{ row,$index }">
          <img :src="row.logoUrl" alt="" style="width:100px;height:100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="width">
        <template slot-scope="{row,$index}">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
         <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteTradeMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="6"
      :page-count="7"
      layout="prev, pager, next,jumper,->,sizes,total"
      :total="99"
      :page-sizes="[10, 20, 50]"
      :page-size="3"
    >
    </el-pagination>
  </div>
</template>

<script>
import { reqTradeMarkList } from "@/api/product/tradeMark.js";
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      list: [],
    };
  },
  mounted() {
    this.gettableList();
  },
  methods: {
    // 获取列表
    gettableList(pager = 1) {
      this.page = pager;
      const { page, limit } = this;

      reqTradeMarkList(page, limit).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.list = res.data.records;
        }
      });
    },
    updateTradeMark(row){

    },
    deleteTradeMark(row){},
  },
};
</script>

<style>
</style>