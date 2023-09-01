// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Questions } from '../models/questions/questions.model';

type CreateOptions = Omit<Questions, 'id'>;

export class QuestionsService {
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  create(options: CreateOptions): Questions {
    return Questions.create(options);
  }
}
