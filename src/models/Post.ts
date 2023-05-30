import Tag from "./Tag";

interface PostProperties {
  id?: string;
  title?: string;
  body?: string;
  mainImage?: string;
  tags?: number[];
  gallery?: string[];
  createdAt?: string;
}

export default class Post {
  id;
  title;
  body;
  mainImage;
  tags;
  gallery;
  createdAt;
  constructor(properties: PostProperties = {}) {
    this.id = properties.id || "";
    this.title = properties.title || "";
    this.body = properties.body || "";
    this.mainImage = properties.mainImage || "";
    this.tags = properties.tags || [];
    this.gallery = properties.gallery || [];
    this.createdAt = properties.createdAt || "";
  }
}
