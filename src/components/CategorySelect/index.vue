<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="formInline.category1Id" placeholder="请选择" @change="getCategory2Id">
          <!-- v-for="(item,index) in " -->
          <el-option  v-for="(item,index) in category1List" :value="item.id" :label="item.name" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="formInline.category2Id" placeholder="请选择" @change="getCategory3Id">
          <el-option :label="item.name"  v-for="(item,index) in category2List" :key="item.id" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="formInline.category3Id" placeholder="请选择">
          <el-option :label="item.name"  v-for="(item,index) in category3List" :key="item.id" :value="item.id"></el-option>
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
      category1List:[],
      category2List:[],
      category3List:[],
    }
  },
  mounted() {
    this.getCategory1Id();
  },
  methods: {
    getCategory1Id() {
      reqCategory1List().then((res) => {
        // console.log(res);
        if(res.code === 200){
          this.category1List = res.data;
        }
      });
    },
    getCategory2Id(){
      reqCategory2List(this.formInline.category1Id).then((res)=>{
       if(res.code === 200){
          this.category2List = res.data;
        }
      })
    },
    getCategory3Id(){
      reqCategory3List(this.formInline.category2Id).then((res)=>{
       if(res.code === 200){
          this.category3List = res.data;
        }
      })
    }
  },
};
</script>

<style>
</style>