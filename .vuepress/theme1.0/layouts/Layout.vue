<template>
    <Main>
        <List :pages="pages" />
    </Main>
</template>

<script>
import { List, Main } from '@theme/components';
export default {
    data() {
        return {
            pages: []
        }
    },
    created() {
        let pages = [];
        this.$site.pages.forEach(page => {
            if (page.type === 'post') {
                pages.push(page);
            }
        });
        this.pages = pages;
    },
    components: {
        List,
        Main
    }
}
</script>


<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="../styles/theme.less" lang="less"></style>
