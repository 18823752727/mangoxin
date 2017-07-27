<template>
    <div>
        <header>
            <div class="user-info">
                <span class="user-name">
                    dada
                </span>
                <span class="layout" @click="layout">
                    退出
                </span>
            </div>
        </header>
    
        <div class="section">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import api from "../http"

export default {
    name: 'index',
    data() {
        return {
            
        }
    },
    methods: {
        layout(){
            api.layout().then(()=>{
                this.$router.push({
                    path:'/login'
                })
            })
        }
    }
}
</script>


<style lang = "less">
header {
    width: 100%;
    height: 60px;
    padding: 0 30px;
    background-color: black;

    .user-info {
        float : right;
        height: 60px;
        line-height: 60px;
        color: #fff;

        .layout {
            margin-left: 20px;
            cursor: pointer;
        }
    }
}

.section {
    max-width: 1000px;
    min-height: 500px;
    margin: 60px auto;
}
</style>

