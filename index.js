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

//define student Schema
const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: String,
    dob: Date,
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: [String],
    parents: {
        father: String,
        mother: String,
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }]
});