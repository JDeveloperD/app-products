import type mongoose from "mongoose";

export interface PaginateOptions extends mongoose.PaginateOptions {}

export interface PaginateResult<T> extends mongoose.PaginateResult<T> {}

export interface Repository<Entity> {
  countResources: (filters?: any) => Promise<number>;
  delete: (id: any) => Promise<void>;
  find: (query: {
    paginationOptions: PaginateOptions;
    filters?: any;
  }) => Promise<PaginateResult<Entity>>;
  getById: (id: any) => Promise<Entity | null>;
  save: (payload: Partial<Entity>) => Promise<Entity>;
  update: (payload: Entity) => Promise<Entity | null>;
}
