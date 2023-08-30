const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride  = require('method-override');
const connectDB =  require('./config/dbconn');
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended : false}));
app.use(methodOverride('_method'));
app.use('/articles',require('./routes/articles'));
app.set('view engine', 'ejs');

connectDB(); 

app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'});
    res.render('articles/index',{articles : articles});
})

mongoose.connection.once('open',()=>{
    console.log('connected to MongoDB');
    app.listen(PORT,()=>console.log('listening to port 5000'));
})
