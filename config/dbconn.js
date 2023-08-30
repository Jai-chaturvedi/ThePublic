const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
   const result = await mongoose.connect('mongodb+srv://jaichaturvedi1861:jai2002@cluster0.7fkgj8h.mongodb.net/BlogDB?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true
   });
    }catch(err) {
        console.log('jai error');
        console.log(err);
    }
}
module.exports = connectDB;