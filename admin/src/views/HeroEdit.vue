<!-- 英雄的创建 -->
<template>
    <div class="about">
        <h1>{{id ? '编辑' : '新建' }}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent = "save">
            
            
            <el-tabs type="border-card" value="skills">

                <el-tab-pane label="基本信息">
                    <el-form-item style="width:25em" label="名称">
                        <el-input v-focus v-model="model.name"></el-input>
                    </el-form-item>


                    <el-form-item label="头像">
                    <!-- 图片的上传 action是一个上传的地址 成功之后返回一个数据给model.icon 先定义一个afterUpload
                    同时还要有一个上传的接口upload -->
                        <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/upload' " 
                            :show-file-list="false"
                            :on-success="afterUpload"
                        >
                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>


                    <el-form-item style="width:25em" label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>


                    <el-form-item label="类型">
                        <!-- multiple多选 每个英雄都可以选择多个类型 -->
                        <el-select v-model="model.categories" multiple >
                            <el-option v-for="item of categories" :label="item.name" 
                            :value="item._id" :key="item._id"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 难度、技能、攻击、生存，都是一样的评分类型，直接复制粘贴 -->
                    <el-form-item label="难度">
                        <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
                    </el-form-item>

                    <el-form-item label="技能">
                        <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
                    </el-form-item>

                    <el-form-item label="攻击">
                        <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
                    </el-form-item>

                    <el-form-item label="生存">
                        <el-rate style="margin-top:0.8rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
                    </el-form-item>

                    <!-- 出装 -->
                    <el-form-item label="顺风出装">
                        <el-select v-model="model.items1" multiple >
                            <el-option v-for="item of items" :label="item.name" 
                            :value="item._id" :key="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="逆风出装">
                        <el-select v-model="model.items2" multiple >
                            <el-option v-for="item of items" :label="item.name" 
                            :value="item._id" :key="item._id"></el-option>
                        </el-select>
                    </el-form-item>
                    

                    <!-- 使用技巧、对抗技巧、团战思路，结构一样，都是文本样式 -->
                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>
                    <el-form-item label="对抗技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>
                    <el-form-item label="团战思路">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>
                </el-tab-pane>

                <el-tab-pane label="技能" name="skills">
                    <el-button size="small" v-on:click="model.skills.push({})">
                        <i class="el-icon-plus"></i>添加技能
                    </el-button>
                    <el-row type="flex" style="flex-wrap: wrap">
                        <!-- 宽度md12 -->
                        <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
                            <el-form-item label="名称">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <!--  -->
                            <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload' " 
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'icon', res.url)"
                                >
                                <!-- on-success成功之后不再是afterUpload 需要重新定义一个  -->
                                
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <!--  -->
                            <el-form-item label="描述">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <!--  -->
                            <el-form-item label="小提示">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <!--  -->
                            <el-form-item>
                                <el-button size="small" type="danger" 
                                @click="model.skills.splice(index, 1)">删除</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>

            </el-tabs>
            

            <el-form-item style="margin-top: 1rem">
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
            categories: [],
            model: {
                scores: {
                 difficult: 0 ,
                 skills: 0 ,
                 attack: 0 ,
                 survive: 0
                },
                skills: []
            } ,
            items: []
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
                res = await this.$http.put(`rest/heroes/${this.id}`, this.model)
            } else {
                res = await this.$http.post('rest/heroes', this.model)
            }
            // console.log('save')
            // this.$http.post('heroes', this.model)
            //一般在这后面用.then方法  这里可以尝试使用async/await方法，
            //同样返回的也是一个promise,就可以把异步回调函数的写法，改成类似同步的

            //创建完成后应该跳转到一个分页列表
            this.$router.push('/heroes/list')
            //跳转之后提示一个
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            //这边需要一个接口，到后端定义
            const res = await this.$http.get(`rest/heroes/${this.id}`)
            // 保证得到的数据是this.model+res.data 而不会产生错误
            // this.model = res.data()
            this.model = Object.assign({}, this.model, res.data )
        },

        async fetchCategories(){
            const res = await this.$http.get(`rest/categories`)
            this.categories = res.data
        },

        async fetchItems(){
            const res = await this.$http.get(`rest/items`)
            this.items = res.data
        },
        //fetch之后到下边的create请求

        //定义上传图片之后,返回的一个数据
        afterUpload(res){
            //vue显示赋值
            this.$set(this.model, 'avatar', res.url)
            //可以事先在model:{}里添加属性，值为空，就可以直接用下面的赋值方法
            // this.model.avatar = res.url
        }
 
    },
    //跳转到编辑列表的时候，应该要显示一个分类的详情，不然不知道原来的值是什么，就不好进行下一步的编辑
    created(){
        //前面这个id满足之后执行后面的这个方法
        this.id && this.fetch()

        this.fetchCategories()

        this.fetchItems()
    }
}   
</script>



