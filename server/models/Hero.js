const mongoose = require('mongoose')
//定义一些模型的字段
const schema = new mongoose.Schema({

    name: { type: String },         //英雄名称
    avatar: { type: String },       //英雄头像
    title: { type: String  },       //英雄称号
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],         //英雄分类

    //英雄评分
    scores: {
        difficult: {type: Number },     //难度
        skills: {type: Number },        //技能
        attack: {type: Number },        //攻击
        survive: {type: Number },       //生存
    },

    //技能展示
    skills:[{
        icon: { type: String },             //技能图标
        name: { type: String },             //技能名字
        description: { type: String },      //技能描述
        tips: { type: String },             //技能使用提示
    }],

    //出装
    items1:[{type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],       //顺风出装
    items2:[{type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],       //逆风出装

    //使用技巧
    usageTips: { type: String },

    //对抗技巧
    battleTips: { type: String },

    //团战思路
    teamTips: { type: String },

    //英雄关系
    //搭档
    partners:[{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' } ,
        description: { type: String }
    }]

})

module.exports = mongoose.model('Hero',schema)
