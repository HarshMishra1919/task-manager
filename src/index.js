require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const app = express();
const port = process.env.PORT || 3000;

// Express middleware
// app.use((req, res, next) => {
//     if (req.method == 'GET') {
//         res.send('GET requests are disabled!')
//     } else {
//         next();
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send("Site is in maintenance mode! Please try again later");

// })

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

//
// Without middleware: new request -> run route handler
//                                                 ^
// With middleware: new request -> do something -> run.
//

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'randomSeriesOfCharacters', {expiresIn: '10 seconds'});
//     console.log(token);

//     const data = jwt.verify(token, 'randomSeriesOfCharacters');
//     console.log(data);
// };

// myFunction();

// const pet = {
//     name: 'Munnu',
// };

// pet.toJSON = function() {
//     return {};
// }

// console.log(JSON.stringify(pet));

// const Task = require('./models/task');
// const User = require('./models/user');

// const main = async () => {
//     // const task = await Task.findById("62121e3cd07324d3e411962d");
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);
//     const user = await User.findById('62121dfad07324d3e4119622');
//     // console.log(user);
//     await user.populate('tasks');
//     console.log(user.tasks);
// };

// main();
