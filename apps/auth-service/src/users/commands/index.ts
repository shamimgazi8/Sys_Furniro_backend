export class UpdateUserCommand {
  constructor(
    public readonly id: number,
    public readonly data: any,
  ) {}
}

export class DeleteUserCommand {
  constructor(public readonly id: number) {}
}
