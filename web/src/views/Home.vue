<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/90bc94bd22057b3c7b9aa49bbd7d6e69.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/8aaa2cffbcaf1793b94844a64886a925.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/0aa5b55b6328398bb4e381f61621f463.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>

export default {
  data(){
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        }
      }
    };
  }
}
</script>

<style lang="scss">
  .pagination-home {
    .swiper-pagination-bullet {
      background: #fff;
    }
  }
</style>
