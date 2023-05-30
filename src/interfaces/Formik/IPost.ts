import Post from "models/Post";

export interface IPost {
  id: string;
  title: string;
  body: string;
  mainImage: string;
  tags: number[];
  gallery: string[];
  createdAt: string;
}

export const PostInitial: IPost = {
  id: "",
  title: "",
  body: "",
  mainImage: "",
  tags: [],
  gallery: [],
  createdAt: "",
};

export const PostFilled = (post: Post) => {
  const definedPost = new Post({ ...post });
  const postTags = definedPost.tags.map((tag) => {
    if (typeof tag === "number") {
      return tag;
    }

    return tag.id;
  });

  const postFormik: IPost = {
    tags: postTags,
    id: definedPost.id,
    title: definedPost.title,
    body: definedPost.body,
    mainImage: definedPost.mainImage,
    gallery: definedPost.gallery,
    createdAt: definedPost.createdAt,
  };

  return postFormik;
};
