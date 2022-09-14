<template>
<div>
   <el-row :gutter="10">
      <el-col :span="12">
        <Search></Search>
      </el-col>
      <el-col :span="12">
        <Category></Category>
      </el-col>
    </el-row>
</div>
 
</template>

<script>
import Category from './Category/index'
import Search from './Search/index'
export default {
name:"",
components:{
  Category,
  Search
},
}
</script>

<style>

</style>