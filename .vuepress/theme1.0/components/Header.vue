<template>
    <header class="blog">
        <h1 class="blog_name" @click="forward('/')">
            {{$siteTitle}}
        </h1>
        <nav class="blog_menu">
            <a v-for="item in $themeConfig.nav" :href="item.path" :title="item.name" @click="forward(item.path)">
                {{item.name}}
            </a>
        </nav>
    </header>
</template>

<script>
export default {}
</script>


<style lang="less" scoped>
.blog {
    background: #f3f3f3;
    display: flex;
    align-items: center;
    &_name {
        margin: 0;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
        padding: 0 15px;
        background: #3f3f3f;
        color: #f3f3f3;
    }
    &_menu {
        a {
            margin-left: 15px;
            font-size: 14px;
            color: #c3c3c3;
        }
    }
}
</style>
