export interface ForumPost {
  id: string;
  movieId: number;
  movieTitle: string;
  moviePoster: string;
  movieYear: string;
  userId: string;
  username: string;
  userAvatar?: string;
  title: string;
  content: string;
  category: ForumCategory;
  hasSpoilers: boolean;
  upvotes: number;
  upvotedBy: string[];
  replyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForumReply {
  id: string;
  postId: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  hasSpoilers: boolean;
  upvotes: number;
  upvotedBy: string[];
  createdAt: string;
  updatedAt: string;
}

export type ForumCategory =
  | "latest-releases"
  | "genre-discussion"
  | "awards-season"
  | "fan-theories"
  | "movie-reviews"
  | "recommendations";

export interface CategoryInfo {
  id: ForumCategory;
  name: string;
  description: string;
  icon: string;
  color: string;
}
