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

// //define student Schema
// const studentSchema = new mongoose.Schema({
//     firstName: { type: String },
//     lastName: String,
//     dob: Date,
//     entryDate: { type: Date, default: Date.now },
//     passed: Boolean,
//     hobbies: [String],
//     parents: {
//         father: String,
//         mother: String,
//     },
//     subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
//     example:{
//         a:String,
//         type: {type:String}
//     }
// });

// // STUDENT Model
// const Student = mongoose.model('Student', studentSchema); // Class
// // const student = new Student({
// //     firstName: "Sazid Ahmed",
// //     lastName: "Nassir",
// //     dob: new Date("17 January 1998"),
// //     passed: true,
// //     hobbies: ["Swimming", "Singing"],
// //     parents: {
// //         father: "Nassir Ghani",
// //         mother: "Rowshan Ara Nasir",
// //     },
// //     subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 100 }],
// // });

// // student.save()
// //     .then(data => console.log(data))
// //     .catch(err => console.log(err._message));

// //using async method

// // C => Create
// async function createStudent() {
//     const student = new Student({
//         firstName: "Moinul Haq",
//         lastName: "Islam ",
//         dob: new Date("27 April 1995"),
//         passed: true,
//         hobbies: ["Swimming", "Gaming", "Watching Movie"],
//         parents: {
//             father: "A",
//             mother: "B",
//         },
//         subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }],
//     });

//     try {
//         const data = await student.save();
//         console.log(data);
//     } catch (err) {
//         console.log(err._message);
//     }
// }

// createStudent();

// // R => Read
// async function readStudents() {
//     const studentsData = await Student
//         .find()
//         .limit(10)
//         .sort({ firstName: -1, lastName: 1 })
//         .select({ firstName: 1, lastName: 1, hobbies: 1 , parents:1, passed:1});
//     console.log(studentsData);
// }

// readStudents();

// //update
// async function updateStudent(id) {
//     const student = await Student.updateOne({ _id: id }, {
//         $set: { passed: false }
//     });
//     console.log(student);
// }

// // updateStudent('62f0a4ea69f63c30c5e31cae');

// //delete
// async function deleteStudent(id) {
//     const student = await Student.deleteOne({ _id: id });
//     console.log(student);
// }

// // deleteStudent('62f0a4ea69f63c30c5e31cae');

// const mongoose = require('mongoose');
// require("dotenv").config();

// mongoose.connect('mongodb://localhost:27017/my-students', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log("Connected to MongoDB Successfully!"))
//     .catch(err => console.error("Connection Failed!!"));

// Schema -> Defines the shape documents
// const studentSchema = new mongoose.Schema({
//     firstName: { type: String },
//     lastName: { type: String, required: [true, "Please insert lastname"] },
//     dob: Date,
//     entryDate: { type: Date, default: Date.now },
//     passed: Boolean,
//     hobbies: [String],
//     parents: {
//         father: String,
//         mother: String,
//     },
//     subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
// });

// // Model
// const Student = mongoose.model('Student', studentSchema); // Class

// C => Create
// async function createStudent() {
//     try {
//         const data = await Student.create({
//             firstName: "Sumanta",
//             lastName: "Pauli",
//             dob: new Date("27 April 1995"),
//             passed: true,
//             hobbies: ["Swimming", "Singing"],
//             parents: {
//                 father: "A",
//                 mother: "B",
//             },
//             subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }],
//         });
//         console.log(data);
//     } catch (err) {
//         console.log(err.message);
//     }
// }

// createStudent();

// Schema -> Defines the shape documents
const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String, required: [true, "Please insert lastname"] },
    dob: {
        type: Date, validate: {
            validator: (value) => value > new Date("1 January 2000"),
            message: "Date must be after 1 January 2000"
        }
    },
    entryDate: { type: Date, default: Date.now },
    passed: Boolean,
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: (value) => value.length > 0,
            message: "There must be at least 1 hobby!"
        }
    },
    parents: {
        father: String,
        mother: String,
    },
    subjects: [{ name: String, marks: { type: Number, min: 0, max: 100 } }],
});

// Model
const Student = mongoose.model('Student', studentSchema); // Class

// C => Create
async function createStudent() {
    try {
        const data = await Student.create({
            firstName: "Israt Jahan",
            lastName: "Nassir",
            dob: new Date("25 April 2009"),
            passed: true,
            hobbies: ['Reading Manga'],
            parents: {
                father: "A",
                mother: "B",
            },
            subjects: [{ name: "Math", marks: 80 }, { name: "English", marks: 90 }],
        });
        console.log(data);
    } catch (err) {
        for (field in err.errors) {
            console.log(err.errors[field].message);
        }
    }
}

createStudent();