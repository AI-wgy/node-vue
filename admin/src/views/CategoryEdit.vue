<!-- 分类的创建 -->
<template>
    <div class="about">
        <h1>新建分类</h1>
        <el-form label-width="120px" @submit.native.prevent = "save">
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button  type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            model: {}
        }
    },
    methods:{
        save(){
            console.log('save')
            this.$http.post('categories', this.model)
            //一般在这后面用.then方法  这里可以尝试使用async/await方法，
            //同样返回的也是一个promise,就可以把异步回调函数的写法，改成类似同步的

            //创建完成后应该跳转到一个分页列表
            this.$router.push('/categories/list')
            //跳转之后提示一个
            this.$message({
                type:'success',
                message:'保存成功'
            })
        }
    }
}
</script>
