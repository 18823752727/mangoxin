<template>
  <div class="list-wrap">
    <div class="add-new">
      <el-button @click="goCreate('create')">新建文章</el-button>
    </div>
  
    <div class="list-content">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="startDate" label="操作时间" width="180">
        </el-table-column>
  
        <el-table-column prop="title" label="标题" width="318">
        </el-table-column>
  
        <el-table-column prop="type" label="类别" width="100">
        </el-table-column>
  
        <el-table-column prop="tag" label="标签" width="210" filter-placement="bottom-end">
          <template scope="scope">
            <el-tag v-for="item in scope.row.tag" :key="item" :type="item === 'node' ? 'primary' : 'success'" close-transition>{{item}}</el-tag>
          </template>
        </el-table-column>
  
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button type="primary" size="small" @click="goCreate('edit',scope.row._id)">编辑</el-button>
            <el-button type="primary" size="small" @click="delArticle(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <div class="page">
        <el-pagination v-if="totalPage > 1" 
                       @current-change="getArticleList" 
                       :current-page.sync="currentPage" 
                       :page-size="pageSize" 
                       layout="prev, pager, next, jumper" 
                       :total="count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../http';

export default {
  data() {
    return {
      tableData: [],
      count: 0,
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.getArticleList();
  },
  computed:{
    totalPage(){
      let _this = this;

      return Math.ceil(_this.count / _this.pageSize);
    }
  },
  methods: {
    /**
     * 获取列表
     * page Number 当前的页数
     */
    getArticleList(page) {
      let _this = this,
        params = {
          page: page,
          pageSize: _this.pageSize
        };

      api.getArticleList(params).then((res) => {
        _this.tableData = res.articleList;
        _this.count = res.count;
      })
    },

    /**
     * 删除
     * articleId Number 文章ID
     */
    delArticle(articleId) {
      let _this = this;

      _this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        let params = {
          articleId: articleId
        }
        // 发送请求
        api.deleteArticle(params).then(() => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });

          // 重新获取列表数据
          _this.getArticleList();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    /**
     * 跳转到创建编辑页面
      * @param articleId 文章的ID
     */
    goCreate(from, articleId) {
      this.$router.push({
        path: '/create',
        query: {
          from: from,
          articleId: articleId
        }
      })
    }
  }
}
</script>

<style lang="less">
.list-wrap {
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;

  .add-new {
    text-align: right;
    margin-bottom: 20px;
  }

  .el-tag {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }

  .list-content {
    position: relative;
    min-height: 500px;

    .page {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
