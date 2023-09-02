/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import {
  getQuestionsList,
  getQuestionsByCategory,
  addQuestionToList,
  deleteQuestionFromList,
  updateQuestion
} from '../controllers/questions.controller';

export const questionsRoutes = express.Router();

questionsRoutes.get('/questions', express.json(), getQuestionsList);
questionsRoutes.get('/questions/:category', express.json(), getQuestionsByCategory);

questionsRoutes.post('/questions', express.json(), addQuestionToList);

questionsRoutes.patch('/questions', express.json(), updateQuestion);

questionsRoutes.delete('/questions', express.json(), deleteQuestionFromList);
