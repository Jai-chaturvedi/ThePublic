const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDomPurify = require('dompurify');
const {JSDOM}= require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);
const {Schema} = mongoose;
const article = new Schema({
    title : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    markdown : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    slug : {
        type : String,
        unique : true
    },
    sanitizedHtml :{
        type : String,
        required : true
    }

})
article.pre('validate',function(next){
    if(this.title ){
        this.slug = slugify(this.title,{
            lower : true,strict : true
        });
    }
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    }
    next();
})

module.exports = mongoose.model('Article',article);