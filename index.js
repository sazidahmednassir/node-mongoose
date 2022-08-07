const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/students', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>
    console.log('connected to mongodb'))
.catch(err=>
    console.error('connection falied')
)