export class GetAllOrdersQuery {
  constructor() {}
}

export class GetOrderByIdQuery {
  constructor(public readonly id: string) {}
}

export class GetOrdersByUserQuery {
  constructor(public readonly userId: string) {}
}
