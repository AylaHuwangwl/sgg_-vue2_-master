<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect
        @getAttrList="getAttrList"
        @getCategory3Id="getCategory3Id"
        :isClick.sync="isClick"
        ref="CategorySelect"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="showTable">
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!(category3Id)"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="100px">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="200px">
          </el-table-column>
          <el-table-column
            prop="attrValueList"
            label="属性值列表"
            width="width"
          >
            <template slot-scope="{ row, $index }">
              <el-tag
                type="success"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                style="margin: 0 20px"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="160px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!showTable">
        <div style="margin: 20px 0">
          <span>属性名:</span>
          <el-input
            placeholder="请输入属性名"
            v-model="attrName"
            style="width: 350px; margin: 0 20px"
          ></el-input>
        </div>
        <div style="margin: 20px 0">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addAttrValue"
            style="margin: 0 20px 0 0"
            :disabled="!attrName"
            >添加属性值</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </div>

        <el-table
          :data="attrValueList"
          style="width: 100%; margin: 20px 0"
          border
        >
          <el-table-column type="index" label="序号" width="100px">
          </el-table-column>
          <el-table-column prop="attrName" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <span v-if="row.flag">{{ row.valueName }}</span>
              <el-input
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                v-else
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="160px">
            <template slot-scope="{ row, $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttrValue">保存</el-button>
        <el-button>取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { reqAddOrUpdateAttr } from "@/api/product/attr";
export default {
  name: "Attr",
  data() {
    return {
      attrList: [],
      showTable: true,
      attrName: "",
      isClick: true,
      attrValueList: [],
      valueList: {
        valueName: "",
        attrId: "",
        flag: false,
      },
      category3Id: "",
      id: "",
    };
  },
  mounted() {},
  methods: {
    // 获取三级分类Id
    getCategory3Id(value) {
      this.category3Id = value;
    },
    // 自定义事件的回调
    getAttrList(value) {
      this.attrList = value;
    },
    // 添加属性
    addAttr() {
      this.showTable = false;
      this.isClick = false;
    },
    // 添加属性值
    addAttrValue() {
      this.attrValueList.push(this.valueList);
      console.log(this.attrValueList);
    },
    cancel() {},
    updateAttr(row) {
      this.showTable = false;
      this.attrName = row.attrName;
      this.id = row.id;
      // this.attrValueList = row.attrValueList;
      for (let item of row.attrValueList) {
        let { attrId, valueName } = item;
        let valueRow = {
          attrId,
          valueName,
          flag: true,
        };
        this.attrValueList.push(valueRow);
      }
      this.valueList.attrId = row.id;
    },
    // 保存添加的属性值
    saveAttrValue() {
      let baseAttrInfo = {
        attrName: this.attrName,
        attrValueList: this.attrValueList,
        categoryId: this.category3Id,
        categoryLevel: 3,
        id: this.id,
      };
      reqAddOrUpdateAttr(baseAttrInfo).then((res) => {
        if (res.code === 200) {
          for(let item of this.attrValueList){
            item.flag = undefined;
          }
          this.showTable = true;
          this.$refs.CategorySelect.getAttrList();
        }
      });
    },
  },
};
</script>

<style>
</style>