// server.js
import express from 'express';
import connection from './config/connection.js'; // Update the path as needed
import adminRoutes from './routes/adminRouter.js';
import instructorRoutes from './routes/instructorRouter.js';
import studentRoutes from './routes/studentRouter.js';

import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;

// Your middleware and route setup here
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.use(adminRoutes);
app.use(instructorRoutes);
app.use(studentRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(cors({ origin: 'https://college-management-system-r4wh9zs8g.vercel.app'}))

// Database connection
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});
