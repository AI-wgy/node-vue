<!-- 分类的创建 -->
<template>
    <div class="about">
        <h1>{{id ? '编辑' : '新建' }}分类</h1>
        <el-form label-width="120px" @submit.native.prevent = "save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent">
                    <!-- 显示的是分类名称，但是存储的数据是ID -->
                    <el-option v-for="item in parents" :key="item._id"
                    :label="item.name" :value="item._id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-focus v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- 创建子分类，保存的时候数据应该存储在数据库里，需要在模型当中添加一个父级分类的字段
                否则即使添加了分类，数据也不会存在数据库里，子分类和父分类也没有任何的关联 -->
                <el-button  type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    //props接收id
    //好处：页面可以跟路由尽可能解耦，不用去写很长的this,router,pramas,id 的写法
    props: {
        id: {}
    },

    data(){
        return{
            model: {} ,
            parents: []
        }
    },

    directives: {
        //注册一个局部自定义指令v-focus
        focus: {
            //指令的定义
            inserted:function(el){
                //聚焦元素
                el.querySelector('input').focus()
            }
        }
    } ,

    methods:{
        async save(){
            //因为新建分类和编辑分类不同，所以在保存的时候做一个判断，
            //当有ID的时候用put方法提交到另一个接口（去后端定义新的接口）
            let res    // eslint-disable-line no-unused-vars
            if (this.id){
                res = await this.$http.put(`categories/${this.id}`, this.model)
            } else {
                res = await this.$http.post('categories', this.model)
            }
            // console.log('save')
            // this.$http.post('categories', this.model)
            //一般在这后面用.then方法  这里可以尝试使用async/await方法，
            //同样返回的也是一个promise,就可以把异步回调函数的写法，改成类似同步的

            //创建完成后应该跳转到一个分页列表
            this.$router.push('/categories/list')
            //跳转之后提示一个
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            //这边需要一个接口，到后端定义
            const res = await this.$http.get(`categories/${this.id}`)
            this.model = res.data
        },
        async fetchParents(){
            //定义上级分类接口的引用,可以直接用分类列表的接口，上级分类本身数据就是来自于分类列表
            const res = await this.$http.get(`categories`)
            this.parents = res.data
        }
    },
    //跳转到编辑列表的时候，应该要显示一个分类的详情，不然不知道原来的值是什么，就不好进行下一步的编辑
    created(){
        //前面这个id满足之后执行后面的这个方法
        this.id && this.fetch()
        this.fetchParents()
    }
}   
</script>
