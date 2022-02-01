export class ValidationError extends Error {
  public attribute: string

  public constructor (attribute: string, message: string) {
    super(message)
    this.attribute = attribute
  }
}

export class DocumentNotFound extends Error {
  public id: unknown

  public constructor (id: unknown, message: string = 'entity-not-found') {
    super(message)
    this.id = id
  }
}
