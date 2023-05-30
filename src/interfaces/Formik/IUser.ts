import dayjs from "dayjs";

import User from "models/User";

export interface IUser {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  role: string;
  userId: string;
}

export const UserInitial: IUser = {
  firstName: "",
  lastName: "",
  dateOfBirth: dayjs().toISOString(),
  phone: "+52",
  address: "",
  email: "",
  password: "",
  userId: "",
  role: "Elegir uno",
};

export const UserFilled = (user: User) => {
  const definedUser = new User({ ...user });
  const userFilled: IUser = {
    ...definedUser,
    userId: definedUser.id,
    password: "",
    role: definedUser.role,
  };

  return userFilled;
};

export const UserWithoutPassword = (user: IUser) => {
  if (user.password.length === 0) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  return user;
};

export const UserWithoutRole = (user: IUser) => {
  const { role, ...userWithoutRole } = user;
  return userWithoutRole;
};
