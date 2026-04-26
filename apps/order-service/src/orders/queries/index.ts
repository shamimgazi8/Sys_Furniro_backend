export class GetAllOrdersQuery {
  constructor() {}
}

export class GetOrderByIdQuery {
  constructor(public readonly id: number) {}
}

export class GetOrdersByUserQuery {
  constructor(public readonly userId: number) {}
}
