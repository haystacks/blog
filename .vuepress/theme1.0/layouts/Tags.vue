<template>
    <Main>
        <Tag :tags="$tags.list"></Tag>
    </Main>
</template>

<script>
import { Main, Tag } from '@theme/components';
export default {
    components: {
        Main,
        Tag
    }
}
</script>

<style src="../styles/theme.less" lang="less"></style>
<style lang="less" scoped>

</style>
