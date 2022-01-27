import { Request, Response } from 'express'
import { Trivia } from '../schemas/Trivia'

class TriviaController {
  public async index(req: Request, res: Response): Promise<Response> {
    const triviaList = await Trivia.find()
    return res.json({ results: triviaList })
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const trivia = await Trivia.create(req.body)
    return res.status(201).json(trivia)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    await Trivia.remove({ _id: req.params.id })
    return res.status(200).send()
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const trivia = await Trivia.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    )
    return res.status(200).json(trivia)
  }

  public async match(req: Request, res: Response): Promise<Response> {
    const triviaList = await Trivia.aggregate([
      { $sample: { size: parseInt(req.query.size) } }
    ])
    return res.json({ results: triviaList })
  }
}

export default new TriviaController()
