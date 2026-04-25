export class CreateOrderCommand {
  constructor(public readonly data: any) {}
}

export class UpdateOrderCommand {
  constructor(
    public readonly id: string,
    public readonly data: any,
  ) {}
}

export class DeleteOrderCommand {
  constructor(public readonly id: string) {}
}
