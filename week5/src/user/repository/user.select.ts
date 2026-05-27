import { Prisma } from '@prisma/client';

export const userSelectWithoutPassword = {
  id: true,
  name: true,
  displayName: true,
} satisfies Prisma.UserSelect;

export const userAuthSelect = {
  ...userSelectWithoutPassword,
  password: true,
} satisfies Prisma.UserSelect;
