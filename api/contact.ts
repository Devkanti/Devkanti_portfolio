import mongoose from 'mongoose';

// 1. Define what a message looks like
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// 2. Create the model securely for serverless
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

// 3. The API function that Vercel will run
export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Only POST allowed' });
    }

    try {
        // Connect to your MongoDB database
        if (mongoose.connection.readyState < 1) {
            const uri = process.env.MONGO_URI;
            if (!uri) throw new Error('MONGO_URI is missing');
            await mongoose.connect(uri);
        }

        // Grab the data from your React form
        const { name, email, message } = req.body;

        // Save it to MongoDB
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        return res.status(201).json({ success: true, message: 'Message saved!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Failed to save' });
    }
}