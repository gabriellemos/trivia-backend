import { Router } from 'express'
import TriviaController from '../controllers/TriviaController'

const routes = Router()

routes.get('/trivia', TriviaController.index)
routes.post('/trivia', TriviaController.store)
routes.put('/trivia/:id', TriviaController.update)
routes.delete('/trivia/:id', TriviaController.delete)
routes.get('/trivia/match', TriviaController.match)

export default routes
