import { Request, Response } from 'express'
import { Model } from 'mongoose'
import { TriviaInterface } from '../interfaces/Trivia'
import { ValidationError } from '../interfaces/Errors'

import { Trivia, TriviaModel } from '../schemas/Trivia'
import { BaseController } from './BaseController'

class TriviaController extends BaseController<
  TriviaInterface,
  TriviaModel,
  Model<TriviaModel>
> {
  public constructor () {
    super(Trivia)
  }

  public match = async (req: Request, res: Response): Promise<Response> => {
    const triviaList = await Trivia.aggregate([
      { $sample: { size: parseInt(req.query.size) } }
    ])
    return res.json({ results: triviaList })
  }

  protected adjust = (body: unknown) => {
    return Promise.resolve(body as TriviaInterface)
  }

  protected validate = async (model: TriviaInterface) => {
    // Other validations are made on insert
    // TODO: Must check for null / undefined
    if (!model.incorrectAnswers) {
      throw new ValidationError('incorrectAnswers', 'required-field')
    } else if (model.incorrectAnswers instanceof Array) {
      if (model.incorrectAnswers.length === 0) {
        throw new ValidationError('incorrectAnswers', 'invalid-length')
      }
    }
  }
}

export default new TriviaController()
