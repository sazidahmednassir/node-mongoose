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
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
    example:{
        a:String,
        type: {type:String}
    }
});

// STUDENT Model
const Student = mongoose.model('Student', studentSchema); // Class
// const student = new Student({
//     firstName: "Sazid Ahmed",
//     lastName: "Nassir",
//     dob: new Date("17 January 1998"),
//     passed: true,
//     hobbies: ["Swimming", "Singing"],
//     parents: {
//         father: "Nassir Ghani",
//         mother: "Rowshan Ara Nasir",
//     },
//     subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 100 }],
// });

// student.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err._message));

//using async method

// C => Create
async function createStudent() {
    const student = new Student({
        firstName: "Moinul",
        lastName: "Islam Haq",
        dob: new Date("27 April 1995"),
        passed: true,
        hobbies: ["Swimming", "Singing"],
        parents: {
            father: "A",
            mother: "B",
        },
        subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }],
    });

    try {
        const data = await student.save();
        console.log(data);
    } catch (err) {
        console.log(err._message);
    }
}

// createStudent();

// R => Read
async function readStudents() {
    const studentsData = await Student
        .find()
        .limit(10)
        .sort({ firstName: -1, lastName: 1 })
        .select({ firstName: 1, lastName: 1, hobbies: 1 , parents:1});
    console.log(studentsData);
}

readStudents();