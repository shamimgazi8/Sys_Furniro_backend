export class GetAllProductsQuery {
  constructor() {}
}

export class GetProductByIdQuery {
  constructor(public readonly id: number) {}
}

export class GetProductsByCategoryQuery {
  constructor(public readonly category: string) {}
}
