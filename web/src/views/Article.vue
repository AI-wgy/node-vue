<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-left text-blue pl-2">
        {{model.title}}
      </strong>
      <div class="text-gery fs-xs">
        2020-08-02
      </div>
    </div>
    <div v-html="model.body" class="px-3 body pt-2 fs-lg pb-3"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu1"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2">
        <router-link
        class="py-1"
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
        >
        {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    //必填
    id: {required: true}
  },
  data() {
    return {
      model: null
    }
  },
  watch: {
    id: 'fetch',
    // id(){
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
}
</script>


<style lang="scss">
.page-article {
  .icon-Back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
      margin: 0.7692rem auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
  // width:73.0769rem;
  // margin: 0.7692rem auto ;
}
</style>