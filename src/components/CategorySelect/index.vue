<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="formInline.category1Id" placeholder="请选择">
          <!-- v-for="(item,index) in " -->
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="formInline.category2Id" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.category3Id" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import {
  reqCategory1List,
  reqCategory2List,
  reqCategory3List,
} from "@/api/product/attr.js";
export default {
  name: "CategorySelect",
  data(){
    return {
      formInline:{
        category1Id:"",
        category2Id:"",
        category3Id:"",
      },
    }
  },
  mounted() {
    this.getCategory1Id();
  },
  methods: {
    getCategory1Id() {
      reqCategory1List().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>