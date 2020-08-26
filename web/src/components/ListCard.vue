<template>
    <m-card :icon="icon" :title="title">
        <div class="nav  jc-between">
            <div class="nav-item" :class="{active: active === i}"
            v-for="(category, i) in categories" :key="i"
            @click="$refs.list.$swiper.slideTo(i)"> 
            <!-- 单击之后下面显示对应的内容 -->
              <div class="nav-link">{{category.name}}</div>
            </div>
        </div>
      <div class="pt-3">
        <swiper ref="list" :options="{autoHeight: true}"
        @slide-change="() => active = $refs.list.$swiper.realIndex">
        <!-- 拖动下边的slide 上边的swiper跳到对应的块 -->
          <swiper-slide class="text-left" v-for="(category, i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data(){
    return {
      active: 0
    }
  }
};
</script>