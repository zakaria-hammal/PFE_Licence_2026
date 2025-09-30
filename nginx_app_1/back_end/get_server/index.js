const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/userdb');
        console.log('Connected to userdb database (GET server)');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

(async () => {
    await connectDB();

    const userSchema = new mongoose.Schema({
        name: String,
        family_name: String,
        mail: String,
        message: String
    }, { collection: 'users' });

    const User = mongoose.model('User', userSchema);


    app.get('/users', async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    });


    app.listen(4000, () => {
        console.log('GET server is listening at port 4000');
    });
})();
