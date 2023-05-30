import Level from "models/Level";

export interface ILevel {
  id: number;
  name: string;
  description: string;
}

export const LevelInitial: ILevel = { id: -1, name: "", description: "" };

export const LevelFilled = (level: Level) => {
  const levelFormik = { ...level };
  return levelFormik;
};
