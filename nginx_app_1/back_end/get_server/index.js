const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json());

async function connectDB() {
    try {
        await mongoose.connect('mongodb://mongo:27017/messagedb');
        console.log('Connected to messagedb database (GET server)');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

(async () => {
    await connectDB();

    const messageSchema = new mongoose.Schema({
        name: String,
        email: String,
        message: String
    }, { collection: 'messages', timestamps: true });

    const Message = mongoose.model('Message', messageSchema);


    app.get('/messages', async (req, res) => {
        try {
            const messages = await Message.find();
            res.json(messages);
        } catch (err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    });

    app.get('/health', (req, res) => {
        res.status(200).send('OK');
    });

    app.listen(3000, () => {
        console.log('GET server is listening at port 3000');
    });
})();
