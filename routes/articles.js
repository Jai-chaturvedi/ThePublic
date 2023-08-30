const express = require('express');
const router=express.Router();
const Article = require('../models/article');
const mongodb  = require('mongodb');
router.get('/new',(req,res)=>{
   res.render('articles/new',{article : new Article()});
   
});
router.get('/edit/:id',async(req,res)=>{
    try{
      const id = (req.params.id).trim();
      console.log('jai',id);
     const article = await Article.findOne({_id : new mongodb.ObjectId(id)}).exec();
     res.render('articles/edit',{article : article});
    }catch(e) {console.log(e)}

});

router.get('/:slug',async(req,res)=>{
    const article = await Article.findOne({slug: req.params.slug}).exec();
    if(article==null) res.redirect('/');
    res.render('articles/show',{article : article});
})

router.post('/',async(req,res)=>{
  let article = new Article({
      title : req.body.title ,
      description : req.body.description,
      markdown : req.body.markdown
  });
  try{
    article = await article.save();
   res.redirect(`/articles/${article.slug}`);
  }catch(err){
    console.log(err);
    res.render('articles/new',{article : article})
  }
})

router.put('/:id',async(req,res)=>{
     let article;
    try{
      const id = (req.params.id).trim();
    article = await Article.findOne({_id : new mongodb.ObjectId(id)}).exec();
    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

     article = await article.save();
       res.redirect(`/articles/${article.slug}`);
      }catch(err){
        console.log(err);
        res.render('articles/edit',{article : article})
      }
})

router.delete('/:id',async(req,res)=>{
  const id = (req.params.id).trim();
    try{  await Article.deleteOne({_id : new mongodb.ObjectId(id)});
      res.redirect('/');
    }catch(e){ console.log(e)}

});


module.exports = router;