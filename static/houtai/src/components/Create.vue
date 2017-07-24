<template>
  <div class="form">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新建文章</el-breadcrumb-item>
    </el-breadcrumb>
  
    <el-form :model="form" label-width="80px" ref="ruleForm" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
  
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio label="文章">文章</el-radio>
          <el-radio label="心情">心情</el-radio>
          <el-radio label="随笔">随笔</el-radio>
        </el-radio-group>
      </el-form-item>
  
      <el-form-item label="分类" prop="tag">
        <el-checkbox-group v-model="form.tag">
          <el-checkbox v-for="tag in tags" :label="tag" :key="tag">{{tag}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
  
      <el-form-item label="活动形式" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
  
      <el-form-item label-width="80px">
        <el-button type="primary" @click="submit('ruleForm')" :disabled="isDisabled">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="less">
.form {
  width: 500px;

  .el-breadcrumb {
    margin-bottom: 30px;
  }
}
</style>

<script>
import api from "../http";

export default {
  data() {
    return {
      // 表单
      form: {
        title: '',  // 文章标题
        type: '文章', // 文章类型
        tag: [],  // 文章标签
        content: ''  // 文章内容
      },
      from: 'create',  // 判断是编辑还是创建
      tags: ['node', 'javascript', 'webpack'],  // 标签组
      isDisabled: false  // 是否禁用保存按钮
    }
  },
  computed: {
    rules() {
      return {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        tag: [
          { type: 'array', required: true, message: '请至少选择一个文章标签', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submit(formName) {
      let _this = this;

      _this.isDisabled = true;

      _this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("校验通过");
          let formData = JSON.parse(JSON.stringify(_this.form));
          
          formData.tag = formData.tag.join(",");

          if(_this.from === 'create'){
            api.createArticle(formData).then((res)=>{
              console.log(res);
            })
          }
        } else {
          _this.isDisabled = false;
        }
      })
    }
  }
}
</script>
