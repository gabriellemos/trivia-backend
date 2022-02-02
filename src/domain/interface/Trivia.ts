import { TriviaType } from '../TriviaType'

export interface TriviaInterface {
  category: string
  type: TriviaType
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}
