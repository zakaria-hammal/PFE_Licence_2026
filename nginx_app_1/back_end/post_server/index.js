const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json())

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userdb');
        console.log('Connected to userdb database');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

( async () => {
    await connectDB();

    const userSchema = new mongoose.Schema({
        name: String,
        family_name: String,
        mail: String,
        message: String
    }, { collection: 'users' });

    const User = mongoose.model('User', userSchema);

    app.post('/addUser', async (req, res) => {
        try {
            const user = new User(req.body);
            const savedUser = await user.save();
            res.json({ message: "Inserted!", data: savedUser });
        } catch (err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    });

    app.listen(5000, () => {
        console.log('Server is listening at port 5000');
    });
})();
