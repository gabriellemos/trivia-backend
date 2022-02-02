import { Document, Schema, Model, model } from 'mongoose'

import { TriviaType } from '../TriviaType'
import { TriviaInterface } from '../interface/Trivia'

export interface TriviaModel extends TriviaInterface, Document {}

const TriviaSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'required-field']
    },
    type: {
      type: String,
      required: [true, 'required-field'],
      enum: {
        values: Object.values(TriviaType),
        message: 'invalid-type'
      }
    },
    question: {
      type: String,
      required: [true, 'required-field']
    },
    correctAnswer: {
      type: String,
      required: [true, 'required-field']
    },
    incorrectAnswers: {
      type: [String],
      required: [true, 'required-field']
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
