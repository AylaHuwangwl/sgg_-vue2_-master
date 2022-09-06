<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="add"
      >添加</el-button
    >
    <el-table :data="list" style="width: 100%" border>
      <el-table-column label="序号" align="center" width="60px" type="index">
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
        <template slot-scope="{ row, $index }">
          <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="width">
        <template slot-scope="{ row, $index }">
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
      :current-page="page"
      :page-count="7"
      layout="prev, pager, next,jumper,->,sizes,total"
      :total="total"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      @current-change="gettableList"
      @size-change="handleSizeChange"
    >
    </el-pagination>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <!-- form表单 :model属性，这个属性的作用是,把表单的数据收集到那个对象的身上 ，将来表单验证，也需要这个属性-->
      <el-form
        style="width: 80%"
        :model="tmForm"
        ref="ruleForm"
        :rules="formrule"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <!--这里收集数据：不能使用v-model，因为不是表单元素
            action:设置图片上传的地址
            :on-success:可以检测到图片上传成功，当图片上传成功，会执行一次
            :before-upload：可以在上传图片之前，会执行一次

          -->
          <el-upload
            class="avatar-uploader"
            action="http://gmall-h5-api.atguigu.cn/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过2MB
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqTradeMarkList,
  reqAddTradeMark,
  reqUpdateTradeMark,
  reqDeleteTradeMark,
} from "@/api/product/tradeMark.js";
export default {
  name: "TradeMark",
  data() {
    const validateTmName = (rule, value, callback) => {
      if (value.length < 2 || value.length > 10) {
        callback(new Error("品牌名称2-10位"));
      } else {
        callback();
      }
    };
    return {
      page: 1,
      limit: 3,
      total: 0,
      list: [],
      // 控制对话框是否显示
      dialogFormVisible: false,
      title: "",
      tmForm: {
        id: undefined,
        tmName: "",
        logoUrl: "",
      },
      formrule: {
        tmName: [
          { requires: true, message: "请输入品牌名称", trigger: "blur" },
          // 自定义校验规则
          { validator: validateTmName, trigger: "change" },
        ],
        logoUrl: [{ required: true, message: "请选择品牌图片" }],
      },
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
          this.total = res.data.total;
        }
      });
    },
    handleSizeChange(limit) {
      this.limit = limit;
      this.gettableList();
    },
    updateTradeMark(row) {
      this.title = "修改品牌";
      this.dialogFormVisible = true;
      this.tmForm = { ...row };
    },
    deleteTradeMark(row) {
      // console.log(row);
      this.$confirm(`你确定删除${row.tmName}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await reqDeleteTradeMark(row.id)
          .then((res) => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.gettableList(
                this.list.length > 1 ? this.page : this.page - 1
              );
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
    add() {
      this.dialogFormVisible = true;
      this.title = "添加品牌";
      this.tmForm.tmName = "";
      this.tmForm.logoUrl = "";
    },
    // 图片上传成功后
    handleAvatarSuccess(result) {
      this.tmForm.logoUrl = result.data;
    },
    // 上传图片之前
    beforeAvatarUpload(file) {
      // console.log(value);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addOrUpdateTradeMark() {
      this.$refs.ruleForm.validate(async (success) => {
        if (success) {
          if (this.title == "添加品牌") {
            reqAddTradeMark(this.tmForm).then((res) => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "添加品牌成功",
                });
                this.dialogFormVisible = false;
                this.gettableList();
              } else {
                return false;
              }
            });
          } else {
            reqUpdateTradeMark(this.tmForm).then((res) => {
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "修改品牌成功！",
                });
                this.gettableList();
                this.dialogFormVisible = false;
              } else {
                return false;
              }
            });
          }
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>