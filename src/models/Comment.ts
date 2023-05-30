import User from "./User";

interface CommentProperties {
  id?: number;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  parentComment?: number;
  user?: User;
  replies?: Comment[];
  count?: number;
}

export default class Comment {
  id;
  content;
  createdAt;
  updatedAt;
  parentComment;
  user;
  replies;
  count;
  constructor(properties: CommentProperties = {}) {
    this.id = properties.id || -1;
    this.replies = properties.replies || [];
    this.content = properties.content || "Sunt amet";
    this.createdAt = properties.createdAt || "";
    this.updatedAt = properties.updatedAt || "";
    this.parentComment = properties.parentComment || -1;
    this.user = properties.user || new User();
    this.count = properties.count || 0;
  }
}
