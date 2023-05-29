export type Operator = "AND" | "OR";

export type Query<T> = Record<keyof T, { operator: Operator; value: unknown }>;

export interface Repository<Entity> {
  getMatching: (query?: Query<Entity>) => Promise<Entity[]>;
  getById: (id: any) => Promise<Entity | null>;
  save: (payload: Partial<Entity>) => Promise<Entity>;
  update: (payload: Entity) => Promise<Entity | null>;
  delete: (id: any) => Promise<boolean>;
}
