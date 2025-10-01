const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json())

async function connectDB() {
    try {
        await mongoose.connect('mongodb://mongo:27017/messagedb');
        console.log('Connected to messagedb database');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

( async () => {
    await connectDB();

    const messageSchema = new mongoose.Schema({
        name: String,
        email: String,
        message: String
    }, { collection: 'messages', timestamps: true });

    const Message = mongoose.model('Message', messageSchema);

    app.post('/addMessage', async (req, res) => {
        try {
            const message = new Message(req.body);
            const savedMessage = await message.save();
            res.json({ message: "Inserted!", data: savedMessage });
        } catch (err) {
            console.log(err);
            res.status(500).send('Server error');
        }
    });

    
    app.delete('/deleteMessage/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const deletedMessage = await Message.findByIdAndDelete(id);

            if (!deletedMessage) {
                return res.status(404).json({ message: "Message not found" });
            }

            res.json({ message: "Message deleted", data: deletedMessage });
        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }
    });
    
    app.get('/health', (req, res) => {
        res.status(200).send('OK');
    });

    app.listen(3000, () => {
        console.log('Server is listening at port 3000');
    });
})();
