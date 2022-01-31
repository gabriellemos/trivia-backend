import { Request, Response } from 'express'
import { Model } from 'mongoose'
import Query from '../interfaces/Query'
import { Trivia, TriviaModel } from '../schemas/Trivia'
import { BaseController } from './BaseController'

class TriviaController extends BaseController<TriviaModel, Model<TriviaModel>> {
  public constructor () {
    super(Trivia)
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    return res.json(await this.paginate(req.query as Query))
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    const trivia = await Trivia.create(req.body)
    return res.status(201).json(trivia)
  }

  public delete = async (req: Request, res: Response): Promise<Response> => {
    await Trivia.remove({ _id: req.params.id })
    return res.status(200).send()
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    const trivia = await Trivia.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
    return res.status(200).json(trivia)
  }

  public match = async (req: Request, res: Response): Promise<Response> => {
    const triviaList = await Trivia.aggregate([
      { $sample: { size: parseInt(req.query.size) } }
    ])
    return res.json({ results: triviaList })
  }
}

export default new TriviaController()
