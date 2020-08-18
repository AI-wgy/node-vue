<!-- 英雄列表 -->
<template>
  <div class="about">
    <h1>英雄列表</h1>
     <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <el-table-column prop="name" label="英雄名称" ></el-table-column>
        <el-table-column prop="title" label="称号" ></el-table-column>
        <el-table-column prop="avatar" label="头像" >
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="height:3rem">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <!-- scope.row表示当前这一行数据 -->
            <el-button type="text" size="small" 
            @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" 
            @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      items: []
    }
  },
  methods: {
    async fetch(){
      const res = await this.$http.get('rest/heroes')
      this.items = res.data
    },
    //使用UI组件，构建删除按钮
    async remove(row){
      this.$confirm(`是否确定要删除分类 "${row.name}" `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          //定义一个res请求删除之后的接口
          const res = await this.$http.delete(`rest/heroes/${row._id}`)   // eslint-disable-line no-unused-vars
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          //删除之后重新获取数据
          this.fetch()
        })
    }
  },
  created(){
    this.fetch()
  }
}
</script>

