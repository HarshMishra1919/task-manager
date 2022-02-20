const mongoose = require('mongoose');
// const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {});


// mongoose does this: Task -> task -> tasks
// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     },
// });

// const task = new Task({
//     description: 'Figure something out',
// });

// task.save()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) => {
//         console.log(`Error: ${error}`);
//     });
