import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import usersRoutes from './routes/users'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database(): void {
    const uri = `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
    mongoose.connect(uri, { useNewUrlParser: true })
  }

  private routes(): void {
    this.express.use(usersRoutes)
  }
}

export default new App().express
