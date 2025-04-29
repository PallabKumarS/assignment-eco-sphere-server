export const USER_ROLE = {
  admin: 'admin',
  member: 'member',
} as const;

export type TUserRole = keyof typeof USER_ROLE;
