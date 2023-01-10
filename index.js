import 'dotenv/config';
import express from 'express';
import ChatGPT from './config/ChatGPTConfig';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    res.send('Hello World!');
})

app.post('/message', async (req, res) =>{
    const msg = new ChatGPT();
    const text = req.body.message;
    try {   
        const response = await msg.sendMessage(text);
        if(response)
        {
            return res.status(200).json(response.choices[0].text);
        }
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})