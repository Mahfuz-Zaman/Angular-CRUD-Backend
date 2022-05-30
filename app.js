const express = require("express");

const app = express();
app.use(express.json());

const cors = require('cors');
const { response } = require("express");
app.use(cors())

const port = 3000;
let users = [
    { id: "jgdfj", name: 'Sazib', phoneNo: '01773253900' },
    { id: "ksdkh", name: 'Sojol', phoneNo: '01731079193' },
    { id: "eyus", name: 'Sobur', phoneNo: '01773853656' },
];
// users[2] = {}

/**
 * MAIN BASE GET PATH
 * () => {}
 */


app.get('/get-all-users', (req, res) => {
    // Data
    const allUsers = [...users];


    // Result
    const result = {
        success: true,
        message: 'Success',
        data: allUsers
    }

    res.status(200)
        .json(result)
})

app.get('/single-user/:id', (req, res) => {
    const id = req.params.id;
    const data = users.find(user => user.id === id);
    // Result
    const result = {
        success: true,
        message: 'Success',
        data: data
    }
    res.status(200)
        .json(result)
})

app.post('/add-user', (req, res, next) => {

    const data = req.body;
    console.log(data);
    const id = Math.random().toString(36).slice(2);
    const newUser = { ...data, id };
    console.log(newUser);
    users.push(newUser);

    res.status(200).json({
        success: true,
        message: 'Success',
        data: data
    })
})

app.put('/edit-user', (req, res) => {
    const updatedUser = req.body;
    console.log(updatedUser);
    const desiredUserId = users.indexOf(users.find(x => x.id === updatedUser.id))
    users[desiredUserId] = updatedUser;

    res.status(200).json(users);
});

app.delete('/delete-user/:id', (req, res) => {
    const deleteId = req.params.id
    users = users.filter(user => user.id !== deleteId)
    res.status(200).json({ msg: deleteId + " deleted" })

})







app.listen(port, () => console.log(`Server is running at port:${port}`));

