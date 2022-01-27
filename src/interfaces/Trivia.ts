import { TriviaType } from '../enum/TriviaType'

export interface TriviaInterface {
  category: string
  type: TriviaType
  question: string
  correctAnswer: string
  incorrectAnswers: string[]
}
