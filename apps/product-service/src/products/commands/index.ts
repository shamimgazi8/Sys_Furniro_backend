export class CreateProductCommand {
  constructor(public readonly data: any) {}
}

export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly data: any,
  ) {}
}

export class DeleteProductCommand {
  constructor(public readonly id: string) {}
}
