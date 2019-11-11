<template>
    <Main>
        <Category :categories="$categories.list"></Category>
    </Main>
</template>

<script>
import { Category, Main } from '@theme/components';
export default {
    components: {
        Category,
        Main
    }
}
</script>

<style src="../styles/theme.less" lang="less"></style>
<style lang="less" scoped>

</style>
