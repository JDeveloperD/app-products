export enum Roles {
  "DEVELOPER",
  "ADMIN",
  "CLIENT",
}

export type Role = keyof typeof Roles;
