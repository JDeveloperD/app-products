export interface UseCase<Dto, Result> {
  execute: (dto: Dto) => Promise<Result> | Result;
}
