import Unit from "models/Unit";

export interface IUnit {
  id: number;
  name: string;
  level: string;
}

export const UnitInitial: IUnit = { id: -1, name: "", level: "" };

export const UnitFilled = (unit: Unit) => {
  const unitFormik = { ...unit };
  return unitFormik;
};
