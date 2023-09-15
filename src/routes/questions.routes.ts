/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  getQuestionsList,
  addQuestionToList,
  deleteQuestionFromList,
  updateQuestion
} from '../controllers/questions.controller';

export const questionsRoutes = express.Router();

questionsRoutes.get('/questions', express.json(), getQuestionsList);

questionsRoutes.post('/questions', express.json(), addQuestionToList);

questionsRoutes.patch('/questions', express.json(), updateQuestion);

questionsRoutes.delete('/questions', express.json(), deleteQuestionFromList);
