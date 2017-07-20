<template>
  <div>
    <ul class="artical-list">
      <li v-for="(item,key) in articalList" :key="key" class="artical-item">
        <div class="item-title">
          <div class="title-content">
            {{item.title}}
          </div>
  
          <div class="title-meta">
            <span>作者 : </span>
            <span class="author">{{item.author}}</span>
            <span>{{item.createDate}}</span>
          </div>
        </div>
  
        <div class="item-description">
          {{item.description}}
        </div>
  
        <button type="button" class="read-all" @click="goArticalDetail(item.id)">阅读全文</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      articalList: [
        {
          id: 1,
          author: 'chengyi',
          createDate: '2017年01月25日',
          title: '这是我的文章标题！！！',
          description: '这是一个简洁描述，hello world！！！',
          link: '/ArticalDetail'
        }, {
          id: 2,
          author: 'chengyi',
          createDate: '2017年01月25日',
          title: '这是我的文章标题！！！',
          description: '这是一个简洁描述，hello world！！！',
          link: '/ArticalDetail'
        }, {
          id: 3,
          author: 'chengyi',
          createDate: '2017年01月25日',
          title: '这是我的文章标题！！！',
          description: '这是一个简洁描述，hello world！！！',
          link: '/ArticalDetail'
        }, {
          id: 4,
          author: 'chengyi',
          createDate: '2017年01月25日',
          title: '这是我的文章标题！！！',
          description: '这是一个简洁描述，hello world！！！',
          link: '/ArticalDetail'
        }
      ]
    }
  },
  methods:{
    goArticalDetail(arId){
      this.$router.push({
        path:'/artiaclDetail',
        query:{
          arId: arId
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@color-red: #f4645f;

.artical {
  .artical-list {
    width: 100%;

    .artical-item {
      padding: 35px;
      margin-bottom: 35px;
      box-shadow: 0 0 0 #ccc;
      border-radius: 5px;
      background-color: #fff;

      .item-title {
        .title-content {
          font-size: 28px;
          color: #303030;
          text-align: center;
        }

        .title-meta {
          font-size: 14px;
          line-height: 1.5;
          margin: 15px 0;
          text-align: center;
          color: #999;

          .author {
            margin-right: 15px;
            color: darken(@color-red, 10%);
          }
        }
      }

      .item-description {
        margin: 30px 0;
        font-size: 18px;
        line-height: 1.5;
      }

      .read-all {
        width: 100px;
        height: 35px;
        font-size: 14px;
        border-radius: 3px;
        color: #fff;
        background-color: @color-red;
        border: none;
        outline: none;
        transition: all 0.5s linear;

        &:hover {
          background-color: darken(@color-red, 15%);
        }
      }
    }
  }
}
</style>
