<template>
    <div class="music" @click="operate">
        <audio :src="music" ref="audio" autoplay></audio>
        <img
            :class="playingClass"
            src="data:image/png;base64,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"
        />
    </div>
</template>

<script>
export default {
    props: {
        music: {
            type: String,
            default: ""
        }
    },
    data() {
        return { playingClass: "" };
    },
    methods: {
        operate() {
            const audio = this.$refs.audio;
            audio.paused ? audio.play() : audio.pause();
            this.playingClass = audio.paused ? "" : "playing";
        }
    }
};
</script>


<style lang="stylus" scoped>
.music {
    position: fixed;
    bottom: 100px;
    right: 50px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;

    img {
        max-width: 100%;
    }

    img.playing {
        animation: rolate 2s linear infinite;
    }
}

@keyframes rolate {
    0% {
        transform: rotateZ(0deg);
    }

    25% {
        transform: rotateZ(90deg);
    }

    50% {
        transform: rotateZ(180deg);
    }

    75% {
        transform: rotateZ(270deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}
</style>