import { Request, Response } from 'express'
import { Document, Model, Error as MongooseError } from 'mongoose'

import Query from '../interfaces/Query'
import { Results } from '../interfaces/Results'
import * as Errors from '../interfaces/Errors'

const UNEXPECTED_ERROR = Object.freeze({ code: 'unexpected-error' })

export abstract class BaseController<
  T,
  TDocument extends T & Document,
  TModel extends Model<TDocument>
> {
  protected model: TModel

  protected constructor (model: TModel) {
    this.model = model
  }

  public index = async (req: Request, res: Response): Promise<Response> => {
    return res.json(await this.paginate(req.query as Query))
  }

  protected paginate = async (query: Query): Promise<Results<TDocument>> => {
    const { page: _page = '1', size: _size = '10', ...conditions } = query
    const count = await this.model.countDocuments(conditions)
    const [page, size] = [parseInt(_page), parseInt(_size)]

    const results = await this.model
      .find(conditions)
      .skip(size * (page - 1))
      .limit(size)

    return {
      page,
      size,
      content: results,
      totalItens: count,
      totalPages: Math.ceil(count / size)
    }
  }

  public create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const model = await this.adjust(req.body)
      await this.validate(model)
      await this.preCreate(model)

      const savedModel = await this.model.create(req.body)
      return res.status(201).json(savedModel)
    } catch (err) {
      return this.handleError(err, res)
    }
  }

  /**
   * Perform extra operations prior to creating document.
   *
   * @param model object being inserted
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preCreate = async (model: T) => {}

  public read = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const model = await this.model.findById(id)
      if (!model) throw new Errors.DocumentNotFound(id)
      return res.status(200).json(model)
    } catch (err) {
      return this.handleError(err, res)
    }
  }

  public update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const storedModel = await this.model.findById(id)
      if (!storedModel) throw new Errors.DocumentNotFound(id)

      const model = await this.adjust(req.body)
      await this.validate(model)
      await this.preUpdate(model)

      const updatedModel = await this.model.findByIdAndUpdate(id, model, {
        new: true,
        runValidators: true
      })

      return res.status(201).json(updatedModel)
    } catch (err) {
      return this.handleError(err, res)
    }
  }

  /**
   * Perform extra operations prior to updating document.
   *
   * @param model object being updated
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preUpdate = async (model: T) => {}

  public delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params
      const model = await this.model.findById(id)
      if (!model) throw new Errors.DocumentNotFound(id)

      await this.preDelete(model)
      await this.model.remove({ _id: id })
      return res.status(202).json(model)
    } catch (err) {
      return this.handleError(err, res)
    }
  }

  /**
   * Perform extra operations prior to deleting document.
   *
   * @param model object being inserted
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected preDelete = async (model: TDocument) => {}

  private handleError = (err: unknown, res: Response): Response => {
    if (err instanceof MongooseError.ValidationError) {
      const mongoError = err as MongooseError.ValidationError
      const { path, message } = Object.values(mongoError.errors)[0]
      return res.status(400).json({ value: path, code: message })
    } else if (err instanceof Errors.ValidationError) {
      const { attribute, message } = err as Errors.ValidationError
      return res.status(400).json({ value: attribute, code: message })
    } else if (err instanceof Errors.DocumentNotFound) {
      const { id, message } = err as Errors.DocumentNotFound
      return res.status(400).json({ value: id, code: message })
    }
    return res.status(500).json(UNEXPECTED_ERROR)
  }

  protected abstract adjust: (body: unknown) => Promise<T>
  protected abstract validate: (model: T) => Promise<void>
}
