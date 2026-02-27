export interface IUseCase<TIn, TOut> {
  execute(input: TIn): Promise<TOut>;
}

export interface IQueryUseCase<TOut> {
  execute(): Promise<TOut>;
}
