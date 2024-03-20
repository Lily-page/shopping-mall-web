<template>
    <div>
        <div v-if="carouselList.length" class="carousel-wrapper" @mouseover="carouselOver" @mouseout="carouselOut">
            <div class="img-content">
                <a><img :src="imgSrc" :width="this.width" :height="this.height"></a>
            </div>
            <div class="indicator-content" ref="indicator">
                <ul class="indicator-list">
                    <li class="indicator-item" v-for="(item, index) in carouselList" :key="index">
                        <a class="indicator-icon" @mouseover="iconOver(index)"
                            :class="index === pos ? 'active' : '' "></a>
                    </li>
                </ul>
            </div>
            <div class="control-content">
                <div title="上一张" class="prev" @click="toggleImg('prev')">&lt;</div>
                <div title="下一张" class="next" @click="toggleImg('next')">&gt;</div>
            </div>
        </div>
    </div>
</template>
<script>
    const iconWidth = 30;
    export default {
        props: {
            width: {
                type: Number,
                default: 900
            },
            height: {
                type: Number,
                default: 400
            },
            interval: {
                type: Number,
                default: 2000
            },
            carouselList: {
                type: Array,
                default: () => {
                    return [];
                }
            }

        },
        watch: {
            carouselList: {
                handler(val) {
                    if (val) {
                        if (this.$refs.indicator) {
                            this.$nextTick(() => {
                                this.$refs.indicator.style.width = iconWidth * val.length + 'px';
                                this.$refs.indicator.style.marginLeft = -(iconWidth / 2) * val.length + 'px';
                            })
                        }
                    }
                },
                immediate: true
            }
        },
        data() {
            return {
                pos: 0,
                startmove: null
            }
        },
        created() {
            this.startmove = setInterval(this.bannerMove, this.interval);
        },

        computed: {
            imgSrc() {
                return this.carouselList[this.pos].src;
            }
        },
        beforeDestory() {
            clearInterval(this.startmove);
        },
        methods: {
            iconOver(index) {
                if (isNaN(index)) return;
                this.pos = index;
            },

            toggleImg(type) {
                if (type === 'prev') {
                    this.pos === 0 ? this.pos = this.carouselList.length - 1 : this.pos--;
                } else {
                    this.pos === this.carouselList.length - 1 ? this.pos = 0 : this.pos++;
                }
            },

            bannerMove() {
                this.pos === this.carouselList.length - 1 ? this.pos = 0 : this.pos++;
            },

            carouselOver() {
                clearInterval(this.startmove);
            },

            carouselOut() {
                this.startmove = setInterval(this.bannerMove, this.interval);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import './style/swiper.scss';
</style>