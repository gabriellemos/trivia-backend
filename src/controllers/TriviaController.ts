import { Model } from 'mongoose'

import { ValidationError } from '../domain/Errors'
import { TriviaInterface } from '../domain/interface/Trivia'
import { Trivia, TriviaModel } from '../domain/model/Trivia'
import { CrudController } from './CrudController'

class TriviaController extends CrudController<
  TriviaInterface,
  TriviaModel,
  Model<TriviaModel>
> {
  public constructor () {
    super(Trivia)
  }

  protected adjust = (body: unknown) => {
    return Promise.resolve(body as TriviaInterface)
  }

  protected validate = async (model: TriviaInterface) => {
    // Other validations are made on insert
    if (model.incorrectAnswers == null) {
      throw new ValidationError('incorrectAnswers', 'required-field')
    } else if (model.incorrectAnswers instanceof Array) {
      if (model.incorrectAnswers.length === 0) {
        throw new ValidationError('incorrectAnswers', 'invalid-length')
      }
    }
  }
}

export default new TriviaController()
