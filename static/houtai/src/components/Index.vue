<template>
    <div>
        <header></header>
    
        <div class="section">
            <router-view></router-view>
        </div>
    </div>
</template>

<style>
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

