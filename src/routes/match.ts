import { Router } from 'express'
import MatchController from '../controllers/MatchController'

const routes = Router()

routes.get('/match', MatchController.match)

export default routes
