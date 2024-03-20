<template>
    <div v-if="slideImg.length" id="slider-wrapper" @mouseover="stop" @mouseout="start" :style="cssVars">
        <div class="main-slide" :style="`background:url(${slideImg[nowIndex].src}) no-repeat;`"></div>
        <div class="extra-slide">
            <div class="extra-slide-item" :class="slideClass(i)" v-for="(item, i) in slideImg" :key="i"
                :style="`background:url(${item.src});background-size:100% 100%;`"></div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            slideImg: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            width: {
                type: Number,
                default: 520
            },
            height: {
                type: Number,
                default: 206
            }
        },
        data() {
            return {
                slideLength: this.slideImg.length,
                nowIndex: 0,
                slideInterval: null
            }
        },
        computed: {
            cssVars() {
                if (this.width && this.height) {
                    return {
                        "--width": `${this.width}px`,
                        "--height": `${this.height}px`
                    };
                }
            }
        },
        watch: {
            slideImg: {
                handler(val) {
                    if(val) {
                        this.slideLength = val.length;
                        this.slideImg = val;
                    }
                },
                deep:true,
                immediate:true
            }
        },
        mounted() {
            this.start()
        },
        methods: {
            resetIndex(i) {
                return i > this.slideLength - 1 ? i - this.slideLength : i;
            },
            slideClass(i) {
                let nowIndex = this.nowIndex;
                let map = new Map([
                    [this.resetIndex(nowIndex), 'extra-slide-top'],
                    [this.resetIndex(nowIndex + 1), 'extra-slide-middle-first'],
                    [this.resetIndex(nowIndex + 2), 'extra-slide-middle-second'],
                    [this.resetIndex(nowIndex + 4), 'extra-slide-bottom']
                ])
                return map.get(i) ? map.get(i) : 'extra-slide-hide'
            },
            start() {
                this.slideInterval = setInterval(() => {
                    this.nowIndex = this.nowIndex > this.slideLength - 2 ? 0 : this.nowIndex + 1;
                }, 2000)
            },
            stop() {
                clearInterval(this.slideInterval)
                this.slideInterval = null;
            }
        },
        destroyed() {
            this.stop()
        }
    }
</script>
<style lang="scss" scoped>
    $width: var(--width);
    $height: var(--height);
    $bWidth: calc(var(--width)/2);
    $sWidth: calc(var(--width)/2);
    $sHeight: var(--height);

    #slider-wrapper {
        width: $width;
        height: $height;
        cursor: pointer;
        background: #ddd;
        border-radius: 10px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647), 0 1px 4px rgba(0, 0, 0, 0.117647);
        display: flex;
        overflow: hidden;

        div {
            display: inline-block;
        }
    }

    .main-slide {
        width: $bWidth;
        height: $height;
        float: left;
        transition: all .4s ease;
        background-size: cover;
        background-position: center;
    }

    .extra-slide {
        width: $sWidth;
        position: relative;

        .extra-slide-item {
            position: absolute;
            width: $sWidth;
            height: $sHeight;
            left: 0;
            transition: .4s ease-out;
        }

        .extra-slide-top {
            top: -$sHeight;
        }

        .extra-slide-middle-first {
            top: 0;
            z-index: 2
        }

        .extra-slide-middle-second {
            top: $sHeight;
            z-index: 2
        }

        .extra-slide-bottom {
            top: $height
        }

        .extra-slide-hide {
            display: none !important;
        }
    }
</style>