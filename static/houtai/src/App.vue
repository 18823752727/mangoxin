<template>
  <div id="app">
    <header>

    </header>

    <div class="section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    watch:{
      '$route':{
        handler(){
          let _this = this;

          _this.$store.dispatch('renderMarkdown', '');
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
    height:60px;
    background-color: black;
  }

  .section {
    max-width: 1000px;
    min-height: 500px;
    margin: 60px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;

  }
</style>
