import { Document, Schema, Model, model } from 'mongoose'

import { TriviaType } from '../enum/TriviaType'
import { TriviaInterface } from '../interfaces/Trivia'

export interface TriviaModel extends TriviaInterface, Document {}

const TriviaSchema = new Schema(
  {
    category: String,
    type: {
      type: String,
      enum: Object.values(TriviaType)
    },
    question: String,
    correctAnswer: String,
    incorrectAnswers: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
)

export const Trivia: Model<TriviaModel> = model<TriviaModel>(
  'Trivia',
  TriviaSchema
)
