<template>
    <article>
        <ul class="blog">
            <li class="blog_link" v-for="tag in tags">
                <a :href="tag.path" :title="tag.name" @click="forward(tag.path)">
                    {{tag.name}}
                </a>
            </li>
        </ul>
    </article>
</template>

<script>
export default {
    props: {
        tags: {
            type: Array,
            default: []
        }
    }
}
</script>

<style lang="less" scoped>
.blog {
    margin: 0;
    padding-left: 15px;
    &_link {
        list-style: none;
        margin: 0;
        font-size: 24px;
        height: 48px;
        line-height: 48px;
        cursor: alias;
    }
}
</style>
