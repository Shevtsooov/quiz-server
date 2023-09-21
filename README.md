# Commands

- npm run dev - run migrations -> seeds -> nodemon
- npm run fix-style - run linter with auto fix
- npm run db-cn - connect a database

# Links

[API](https://api.quick-quiz.site/)

# Endpoints

### GET /questions

This endpoint retrieves a list of all the questions.

_https://api.quick-quiz.site/questions_

***

### POST /questions

This endpoint adds a new question to the list.
The following fields are required:
```
{
  "title": string,
  "answers": string[],
  "correctAnswer": number,
  "category": string,
  "difficulty": string
}
```
_https://api.quick-quiz.site/questions_

***

### PATCH /questions

This endpoint updates a question in the list searched by a current title.
Current title is required. all other fields are optional:

_Patch request bodies examples:_
```
{
  "title": "Who drew the \"Mona Lisa\"?",
  "category": "geography"
},

//changing the title and category
{
  "title": "Who drew the \"Mona Lisa\"?",
  "newTitle": "Who is the author of the \"Mona Lisa\" painting?",
  "category": "art",
},

//changing the answers and the difficulty
{
  "title": "Who is the author of the \"Mona Lisa\" painting?",
  "answers": [
    "Leonardo da Vinci",
    "Michelangelo",
    "Rembrandt",
    "Vincent van Gogh",
  ],
  "difficulty": "medium"
}
```

_https://api.quick-quiz.site/questions_

***

### DELETE /questions

This deletes a question by the found title.

_Delete body should be the following:_
```
{
  "title": "Who is the author of the \"Mona Lisa\" painting?"
}
```

_https://api.quick-quiz.site/questions_
