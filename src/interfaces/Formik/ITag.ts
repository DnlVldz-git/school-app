import Tag from "models/Tag";

export interface ITag {
  id: number;
  name: string;
}

export const TagInitial: ITag = { id: -1, name: "" };

export const TagFilled = (tag: Tag) => {
  const tagFormik = { ...tag };
  return tagFormik;
};
