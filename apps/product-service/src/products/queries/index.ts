export class GetAllProductsQuery {
  constructor() {}
}

export class GetProductByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetProductsByCategoryQuery {
  constructor(public readonly category: string) {}
}
