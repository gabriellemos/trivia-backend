import { Router } from 'express'
import TriviaController from '../controllers/TriviaController'

const routes = Router()

routes.get('/trivia', TriviaController.index)
routes.post('/trivia', TriviaController.create)
routes.get('/trivia/:id', TriviaController.read)
routes.put('/trivia/:id', TriviaController.update)
routes.delete('/trivia/:id', TriviaController.delete)

export default routes
