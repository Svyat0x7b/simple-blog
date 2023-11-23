import { connectDatabase, insertDocument, getDocuments } from '../../helpers/db';

async function handler(req, res) {
    let client;
    try {
        client = await connectDatabase();
    } catch (err) {
        res.status(500).json({ message: err || 'Conecting to a DB failed!' });
        return;
    }

    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            !name.trim() === '' ||
            !message ||
            !message.trim() === ''
        ) {
            res.status(422).json({ message: 'Bad data!' });
            return;
        }

        //store to a db
        const newMessage = { email: email, name: name, message: message };

        try {
            insertDocument(client, newMessage, 'messages');
        } catch (err) {
            res.status(500).json({ message: err || 'Writing to a DB failed!' });
            return;
        }

        res.status(201).json({
            message: 'Successfully send!',
            data: newMessage,
        });
    }

    if (req.method === 'GET') {
        let messages;
        try {
            messages = await getDocuments(client, 'messages');
        } catch (err) {
            res.status(500).json({ message: err || 'Fetching from a DB failed!' });
            return;
        }

        res.status(200).json({
            message: 'Successfully get!',
            messages: messages,
        });
    }
}

export default handler;
