import { Document, Model } from 'mongoose'
import Query from '../interfaces/Query'
import { Results } from '../interfaces/Results'

export abstract class BaseController<T extends Document, K extends Model<T>> {
  protected model: K

  protected constructor (model: K) {
    this.model = model
  }

  protected paginate = async (query: Query): Promise<Results<T>> => {
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
}
