<template>
  <div id="app">
    <!--左边侧边栏导航-->
    <aside></aside>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Aside from './components/aside.vue';

export default {
  name: 'app',
  computed:{
    ...mapGetters(['isLogin'])
  },
  components: {
    Aside,
  },
  watch: {
    '$route': {
      handler() {
        let _this = this;

        _this.$store.dispatch('renderMarkdown', '');
      }
    },
    'isLogin':{
      handler(value){
        if(!value){
          this.$router.push({
            path:'/login'
          })
        }
      }
    }
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

body {
  color: #505050;
  background-color: #EBEDF2;
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

header {
  width: 100%;
  height: 60px;
  background-color: black;
}

.section {
  max-width: 1000px;
  min-height: 500px;
  margin: 60px auto;
}
</style>
