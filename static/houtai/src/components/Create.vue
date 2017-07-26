<template>
  <div class="form">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新建文章</el-breadcrumb-item>
    </el-breadcrumb>
  
    <el-form :model="form" label-width="80px" ref="ruleForm" :rules="rules">
      <el-form-item label="标题" prop="title" class="article-title">
        <el-input v-model="form.title" maxlength="20"></el-input>
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
  
      <el-form-item label="内容" prop="content" class="article-content">
        <el-input type="textarea" v-model="form.content" @input="renderHtml"></el-input>
        <!--
          -->
        <div class="content-text" v-html="getRenderHtml"></div>
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
  .el-breadcrumb {
    margin-bottom: 30px;
  }

  .article-title {
    width: 500px;
  }

  .article-content {
    .el-textarea {
      width: 400px;

      .el-textarea__inner {
        height: 500px;
        padding: 10px;
        border: none;
        resize: none;
        background-color: #ececec;
      }
    }

    .content-text {
      display: inline-block;
      width: 400px;
      height: 500px;
      padding-left: 30px;
      vertical-align: top;
      overflow: auto;
      border-left: 1px solid #ccc;
      background-color: #dcd9d9;
    }
  }
}
</style>

<script>
import api from "../http"
import marked from 'marked'
import { mapState, mapGetters, mapActions } from 'vuex'

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
      articleId: '', // 文章Id
      from: 'create',  // 判断是编辑还是创建
      tags: ['node', 'javascript', 'webpack'],  // 标签组
      isDisabled: false  // 是否禁用保存按钮
    }
  },
  computed: {
    ...mapGetters(['getRenderHtml']),
    rules() {
      return {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        tag: [
          { type: 'array', required: true, message: '请至少选择一个文章标签', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容' }
        ],
      }
    }
  },
  created() {
    this.getDefaultData();
  },
  methods: {
    // 获取默认数据
    getDefaultData() {
      let _this = this,
        articleId = _this.$route.query.articleId,
        from = _this.$route.query.from;


      _this.from = from;
      _this.articleId = articleId;

      // 如果不是来自新建就获取文章数据
      if (from === 'create') {

      } else {
        let getData = {
          articleId: articleId
        }
        // 获取文章数据
        api.getArticle(getData).then((res) => {
          _this.form = {
            title: res.title,
            type: res.type,
            tag: res.tag,
            content: res.content
          }

          _this.renderHtml();
        })
      }
    },

    // 渲染markdown
    renderHtml() {
      let _this = this,
        _renderHtml = marked(_this.form.content);

      _this.$store.dispatch('renderMarkdown', _renderHtml);
    },

    // 保存
    submit(formName) {
      let _this = this;

      _this.isDisabled = true;

      _this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("校验通过");
          let form = JSON.parse(JSON.stringify(_this.form)),
            postData = {
              title: form.title,
              type: form.type,
              tag: form.tag.join(","),
              content: form.content
            };

          // 如果来自创建，调用创建接口
          if (_this.from === 'create') {
            api.createArticle(postData).then((res) => {
              _this.$router.push({
                path: '/'
              })
            })
          } else {
            postData.articleId = _this.articleId;
            api.editArticle(postData).then((res) => {
              _this.$router.push({
                path: '/'
              })
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
