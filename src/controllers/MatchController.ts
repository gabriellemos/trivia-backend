import { Request, Response } from 'express'

import { Trivia } from '../domain/model/Trivia'

class MatchController {
  public match = async (req: Request, res: Response): Promise<Response> => {
    const triviaList = await Trivia.aggregate([
      { $sample: { size: parseInt(req.query.size) } }
    ])
    return res.json({ results: triviaList })
  }
}

export default new MatchController()
