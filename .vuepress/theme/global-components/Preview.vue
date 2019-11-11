<template>
    <div class="preview">
        <img :data-src="src" :src="defaultSrc" :alt="alt" ref="img" @load="success" @error="error" />
        <span @click="loadImg">
            {{alt}}
            <span ref="tip">[点击加载看图]</span>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            defaultSrc:
                "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
        };
    },
    props: {
        src: {
            type: String,
            default: ""
        },
        alt: {
            type: String,
            default: ""
        }
    },
    methods: {
        error() {
            if (this.$refs.img.src === this.$refs.img.dataset.src) {
                this.$refs.img.src = this.defaultSrc;
                this.$refs.tip.innerText = "[加载失败 点击重新加载]";
            }
        },
        loadImg(e) {
            if (this.$refs.img.src === this.$refs.img.dataset.src) {
                return;
            }
            this.$refs.img.src = this.$refs.img.dataset.src;
            this.$refs.tip.innerText = "[加载中...]";
        },
        success() {
            if (this.$refs.img.src === this.$refs.img.dataset.src) {
                this.$refs.tip.innerText = "";
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.preview {
    text-align: center;
    font-size: 14px;
    padding: 10px 0 10px;

    span {
        color: #3eb0ef;
    }
}
</style>