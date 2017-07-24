<template>
  <div>
    <div class="add-new">
      <el-button @click="create">新建文章</el-button>
    </div>
  
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="操作时间" width="180">
      </el-table-column>
  
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
  
      <el-table-column prop="type" label="类别">
      </el-table-column>
  
      <el-table-column label="操作">
        <template scope="scope">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from '../http';

export default {
  data() {
    return {
      tableData: []
    }
  },
  created(){
    this.getArticleList();
  },
  methods: {
    getArticleList(page){
      let _this = this;

      api.getArticleList().then((res)=>{
        _this.tableData = res.data.return_msg;
      })
    },

    /**
     * 跳转到创建编辑页面
      * @param articleId 文章的ID
     */
    create(articleId) {
      this.$router.push({
        path: '/create',
        query: {
          articleId: articleId
        }
      })
    }
  }
}
</script>

<style lang="less">
.add-new {
  text-align: right;
  margin-bottom: 20px;
}
</style>
