export class UpdateUserCommand {
  constructor(
    public readonly id: string,
    public readonly data: any,
  ) {}
}

export class DeleteUserCommand {
  constructor(public readonly id: string) {}
}
