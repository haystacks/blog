<template>
    <ul class="timeline">
        <slot></slot>
        <TimelineItem v-for="item in items" :item="item" />
    </ul>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            dafault() {
                return [];
            }
        }
    }
};
</script>


<style lang="stylus" scoped>
.timeline {
    list-style-type: none;
    margin: 0;
    padding: 10px 0 10px;
    position: relative;

    &:before {
        background-color: #eee;
        bottom: 0;
        content: ' ';
        left: 50px;
        margin-left: -1.5px;
        position: absolute;
        top: 0;
        width: 3px;
    }
}
</style>