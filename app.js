// const express = require('express');
// const app = express();
// const path = require('path');
// const userModel = require('./models/user')

// app.set("view engine","ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname,'public')))

// app.get("/",(req,res) => {
//     res.render("index");
// })

// app.get("/read", async (req, res) => {
//     let users = await userModel.find();
//     res.render("read", {users});
// })

// app.get("/edit/:userid", async (req, res) => {
//     let user = await userModel.findOne({_id: req.params.userid});
//     res.render("edit", {user});
// })

// app.post("/update/:userid", async (req, res) => {
//     let {image,name,email}=req.body;
//     let user = await userModel.findOneAndUpdate({_id: req.params.userid},{image,name,email},{new:true});
//     res.redirect("/read");
// })

// app.post("/create",async (req,res) => {
//     let {name,email,image} = req.body;

//   let createdUser = await userModel.create({
//     name,
//     email,
//     image

//    })

//    res.redirect("/read");
// })

// app.get("/delete/:id", async (req,res) => {
//     let users = await userModel.findOneAndDelete({_id: req.params.id});
//     res.redirect("/read");
// })



// app.listen(5000);


const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const userModel = require('./models/user');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'your-local-mongo-uri';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    let users = await userModel.find();
    res.render('read', { users });
});

app.get('/edit/:userid', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.userid });
    res.render('edit', { user });
});

app.post('/update/:userid', async (req, res) => {
    let { image, name, email } = req.body;
    await userModel.findOneAndUpdate({ _id: req.params.userid }, { image, name, email }, { new: true });
    res.redirect('/read');
});

app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;
    await userModel.create({ name, email, image });
    res.redirect('/read');
});

app.get('/delete/:id', async (req, res) => {
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.redirect('/read');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the app for Vercel
module.exports = app;
