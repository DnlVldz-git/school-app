import Role from "models/Role";

export interface IRole {
  id: number;
  name: string;
  description: string;
}

export const RoleInitial: IRole = { id: -1, name: "", description: "" };

export const RoleFilled = (role: Role) => {
  const roleFormik = { ...role };
  return roleFormik;
};
