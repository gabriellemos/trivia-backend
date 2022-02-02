import { Request, Response } from 'express'

import { User } from '../domain/model/User'

class UserController {
  public index = async (req: Request, res: Response): Promise<Response> => {
    const users = await User.find()
    return res.json(users)
  }

  public store = async (req: Request, res: Response): Promise<Response> => {
    const user = await User.create(req.body)
    return res.json(user)
  }
}

export default new UserController()
