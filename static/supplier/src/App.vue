<template>
  <div id="app" class="container">
    <!--头部-->
    <header class="header">
      <!--banner图-->
      <div class="banner"></div>
      <!--导航-->
      <nav class="nav">
        <ul class="clear-float nav-list">
          <li v-for="(item,index,key) in navList" class="nav-item" :key="key" @click="changeNav(index)">
            <router-link :to="item.link" tag="span" class="nav-link" :class="{'active':activeNav === index}">
              {{item.label}}
            </router-link>
          </li>
        </ul>
      </nav>
    </header>
  
    <!--主体-->
    <section class="section">
      <!--文章内容-->
      <div class="artical">
        <router-view></router-view>
      </div>
  
      <!--侧边栏-->
      <aside class="aside">
  
      </aside>
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      // 导航列表
      navList: [
        {
          label: '精选',
          link: '/'
        }, {
          label: '芒果集',
          link: '/list'
        }, {
          label: '留言',
          link: '/message'
        }, {
          label: '关于',
          link: '/about'
        },
      ],
      activeNav: 0 // 当前哪个导航处于激活状态
    }
  },
  created() {
    this.changeRouter();
  },
  methods: {
    changeRouter() {
      let _this = this,
        meta = _this.$route.meta,
        activeNav = 0;

      switch (meta) {
        case 'index':
          activeNav = 0;
          break;
        case 'list':
          activeNav = 1;
          break;
        case 'message':
          activeNav = 2;
          break;
        case 'about':
          activeNav = 3;
          break;
      }

      _this.activeNav = activeNav;
    },

    changeNav(index) {
      this.activeNav = index;
    }
  }
}
</script>

<style lang="less">
@color-red: #dc3445;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

body {
  background-color: #EBEDF2;
}

a {
  text-decoration: none;
}

ul li {
  list-style: none;
}

input::-ms-clear {
  display: none;
}

button {
  border: none;
  background: none;
  color: inherit;
  outline: none;
  cursor: pointer;
}

.clear-float {
  zoom: 1;

  &:after {
    content: "";
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
  }
}

.container {
  min-width: 1000px;

  .header {
    .banner {
      width: 100%;
      height: 260px;
      background-color: @color-red;
    }

    .nav {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60px;
      background-color: #fff;

      .nav-list {
        .nav-item {
          float: left;
          font-size: 14px;
          padding: 0 25px;
          cursor: pointer;

          .nav-link {
            color: #807676;

            &.active {
              color: @color-red;
            }

            &:hover {
              color: @color-red;
            }
          }
        }
      }
    }
  }

  .section {
    display: flex;
    justify-content: space-between;
    width: 1000px;
    margin: 40px auto;

    .artical {
      width: 70%;
    }

    .aside {
      width: 27%;
      height: 500px;
      background-color: #fff;
    }
  }
}
</style>
