<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/90bc94bd22057b3c7b9aa49bbd7d6e69.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/8aaa2cffbcaf1793b94844a64886a925.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/0aa5b55b6328398bb4e381f61621f463.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>

    <!-- 图标导航 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <!-- 使用精灵图标，适用于彩色的图片/图标 ， 单色图标可以用字体图标，但是精灵图片增删改不好操作 -->
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data(){
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        },
        loop: true,
        slidesPerView: "auto",
        speed: 300,
        autoplay: {
          disableOnInteraction: false, //手动滑动之后不打断播放
          delay: 2000
        }
      }
    };
  }
}
</script>

<style lang="scss">
@import '../assets/scss/varibles.scss' ;
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}


.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25% ;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
