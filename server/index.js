import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {userRoute} from './routes/userRoutes.js';
import {residencyRoute} from './routes/residencyRoute.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());
  
app.use(cookieParser());




app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);

app.listen(PORT, () => {   

    console.log(`Server is running on port ${PORT}`);
});