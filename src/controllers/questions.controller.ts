/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { Request, Response } from 'express';
import { Questions } from '../models/questions/questions.model';
import { Op } from 'sequelize';

const categories = {
  geography: 'Географія',
  history: 'Історія',
  sport: 'Спорт',
  others: 'Інше',
  science: 'Наука',
  movies: 'Кіно',
  music: 'Музика',
  art: 'Мистецтво',
  literature: 'Література',
  games: 'Ігри',
  technologies: 'Технології',
  floraAndFauna: 'Флора та фауна'
};

export const getQuestionsList = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    limit,
    offset = 0,
    query = '',
    categoryName = 'all',
    difficulty = 'all'
  } = req.query;

  try {
    const whereClause = {
      title: {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
        [Op.iLike]: `%${query}%`
      }
    };

    if (categoryName !== 'all') {
      whereClause.categoryName = categoryName;
    }

    if (difficulty !== 'all') {
      whereClause.difficulty = difficulty;
    }

    const questions = await Questions.findAndCountAll({
      raw: true,
      where: whereClause,
      limit,
      offset: Number(offset),
      order: [['id', 'DESC']]
    });

    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
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
      id,
      title,
      answers,
      correctAnswer,
      category,
      difficulty
    } = req.body;

    const currentQuestion = await Questions.findOne({
      where: {
        id
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

      if (title !== undefined) {
        updateData.title = title;
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
