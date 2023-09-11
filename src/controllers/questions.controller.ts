/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { Request, Response } from 'express';
import { Questions } from '../models/questions/questions.model';
import { sequelize } from 'sequelize-typescript';

const categories = {
  geography: 'Географія',
  history: 'Історія',
  sport: 'Спорт',
  others: 'Інше',
  science: 'Наука',
  politics: 'Політика',
  movies: 'Кіно',
  music: 'Музика',
  art: 'Мистецтво',
  literature: 'Література',
  personalities: 'Особистості',
  entetainment: 'Розваги',
  technologies: 'Технології',
  floraAndFauna: 'Флора та фауна',
  human: 'Людина'
};

export const getQuestionsList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const questions = await Questions.findAll({
      raw: true,
      attributes: {
        include: [
          [
            sequelize.cast(sequelize.col('answers'), 'ARRAY(TEXT)'),
            'answers'
          ]
        ]
      }
    });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuestionsByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { category } = req.params;

    if (!(category in categories)) {
      res.status(404).json({ error: 'На жаль, такої категорії не існує, або ж ви помилилися у її написанні' });

      return;
    }

    const questions = await Questions.findAll({
      raw: true,
      where: {
        category
      }
    });

    if (questions.length === 0) {
      res.status(404).json({ error: 'В даній категорії ще немає жодного питання' });

      return;
    }

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
};

export const addQuestionToList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      answers,
      correctAnswer,
      category,
      difficulty
    } = req.body;

    if (!(category in categories)) {
      res.status(404).json({ error: 'На жаль, такої категорії не існує, або ж ви помилилися у її написанні' });

      return;
    }

    const newQuestion = await Questions.create({
      title,
      answers,
      correctAnswer,
      category,
      categoryName: categories[category],
      difficulty
    });

    res.statusCode = 201;
    res.send(newQuestion);
  } catch (error) {
    res.status(404).json({ error: 'Не вдалось додати питання' });
  }
};

export const deleteQuestionFromList = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title } = req.body;

    const questions = await Questions.findAll();

    const allTheTitles = questions.map(question => (
      question.title
    ));

    console.log(allTheTitles);

    if (!allTheTitles.includes(title)) {
      res.status(404).json({ error: 'На жаль, такого питання не існує, або ж ви помилилися у його написанні' });

      return;
    }

    const removedQuestion = await Questions.destroy({
      where: {
        title
      }
    });
    res.send('hi');
    res.statusCode = 204;
    res.send(removedQuestion);
  } catch (error) {
    res.status(404).json({ error: 'Не вдалось видалити питання' });
  }
};

export const updateQuestion = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      newTitle,
      answers,
      correctAnswer,
      category,
      difficulty
    } = req.body;

    const currentQuestion = await Questions.findOne({
      where: {
        title
      }
    });

    if (currentQuestion !== null) {
      const updateData: {
        title?: string
        answers?: string[]
        correctAnswer?: string
        category?: string
        categoryName?: string
        difficulty?: string
      } = {};

      if (newTitle !== undefined) {
        updateData.title = newTitle;
      }

      if (answers !== undefined) {
        updateData.answers = answers;
      }

      if (correctAnswer !== undefined) {
        updateData.correctAnswer = correctAnswer;
      }

      if (category !== undefined) {
        updateData.category = category;
        updateData.categoryName = categories[category];
      }

      if (difficulty !== undefined) {
        updateData.difficulty = difficulty;
      }

      currentQuestion.set(updateData);

      const updatedQuestion = await currentQuestion.save();

      res.statusCode = 200;
      res.send(updatedQuestion);
    } else {
      res.status(404).json({ error: 'Питання не знайдено' });
    }
  } catch (error) {
    res.status(404).json({ error: 'Не вдалось оновити питання' });
  }
};
