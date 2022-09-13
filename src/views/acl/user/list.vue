<template>
  <div>
    <div style="margin-bottom:20px">
      <el-input placeholder="用户名" style="width: 300px"></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin:0 10px">查询</el-button>
      <el-button type="default">清空</el-button>
    </div>
    <div>
      <el-button type="primary">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <el-table
      :data="data"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55px">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="序号"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="用户名"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="用户昵称">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="权限列表">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="更新时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="230">
      </el-table-column>
    </el-table>
    <el-pagination
      current-page="1"
      total="100"
      page-size="5"
      :page-sizes="[3, 10, 20, 30, 40, 50, 100]"
      style="padding: 20px 0;"
      layout="prev, pager, next, jumper, ->, sizes, total"
     
    />
    <!--  @current-change="getUsers"
      @size-change="handleSizeChange" -->
  </div>
</template>

<script>
export default {
  name: "AclUserList",
  data(){
    return {
      data:{},
    }
  },
};
</script>

<style>
</style>