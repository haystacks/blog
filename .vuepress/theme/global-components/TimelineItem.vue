<template>
    <li class="timeline-item">
        <div class="timeline-badge success">
            <slot name="icon">{{item.time}}</slot>
        </div>
        <div class="timeline-panel success">
            <slot name="content">
                <template v-if="typeof item.content === 'string'">{{item.content}}</template>
                <template v-else>
                    <p v-for="val in item.content">{{val}}</p>
                </template>
            </slot>
        </div>
    </li>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default() {
                return {
                    time: "",
                    content: ""
                };
            }
        }
    }
};
</script>

<style lang="stylus" scoped>
.timeline {
    .success {
        background-color: #0196a3 !important;
        color: #fff;

        &:after {
            border-right-color: #0196a3 !important;
        }
    }

    &-item {
        margin-bottom: 10px;
        position: relative;
        // min-height: 50px;
    }

    &-badge {
        background-color: #999;
        border-radius: 50%;
        color: #fff;
        font-size: 1.4em;
        height: 50px;
        left: 50px;
        line-height: 52px;
        margin-left: -25px;
        position: absolute;
        text-align: center;
        top: 16px;
        width: 50px;
        z-index: 100;
        font-size: 12px;
        font-weight: bold;
    }

    &-panel {
        border-radius: 2px;
        border: 1px solid #d4d4d4;
        box-shadow: 0 1px 2px rgba(100, 100, 100, 0.2);
        margin-left: 100px;
        padding: 20px;
        position: relative;
        min-height: 42px;

        &:before {
            border-bottom: 15px solid transparent;
            border-left: 0 solid #ccc;
            border-right: 15px solid #ccc;
            border-top: 15px solid transparent;
            content: ' ';
            display: inline-block;
            position: absolute;
            left: -15px;
            right: auto;
            top: 26px;
        }

        &:after {
            border-bottom: 14px solid transparent;
            border-left: 0 solid #fff;
            border-right: 14px solid #fff;
            border-top: 14px solid transparent;
            content: ' ';
            display: inline-block;
            position: absolute;
            left: -14px;
            right: auto;
            top: 27px;
        }
    }
}

@media screen and (max-width: 640px) {
    .timeline {
        .success {
            &:after {
                border-color: transparent !important;
                border-bottom-color: #0196a3 !important;
            }
        }

        &-badge {
            position: relative;
        }

        &-panel {
            margin: 36px 0 0 0;
            min-height: auto;

            &:before {
                border-bottom: 15px solid #ccc;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                border-top: 0 solid #ccc;
                left: 34px;
                top: -16px;
            }

            &:after {
                border-bottom: 14px solid #fff;
                border-left: 14px solid transparent;
                border-right: 14px solid transparent;
                border-top: 14px solid #fff;
                left: 35px;
                top: -28px;
            }
        }
    }
}
</style>