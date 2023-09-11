import express from 'express';
import cors from 'cors';
import { initDB } from './initDB';
import { questionsRoutes } from './routes/questions.routes';

const PORT = 5001;

const app = express();
app.use(cors({
  origin: '*'
}));

// Sequelize starts

const sequelize = initDB();
const res = sequelize.authenticate();

console.log(res);

// Sequelize ends

app.use(express.static('public'));

app.use(questionsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀🚀🚀`);
});
