import { Dispatch, SetStateAction } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Post {
    id: number;
    title?: string;
    content: string;
    imageUrl?: string;
    authorId: number;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: number;
    content: string;
    postId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Like {
    id: number;
    postId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export interface AuthContextType {
	user: User | null;
	setUser: User | Dispatch<SetStateAction<User | null>> | null;
	handleRegister: (user: Omit<User, "id">) => boolean;
	handleLogin: (user: User) => { email: boolean; password: boolean };
	handleLogout: () => void;
	updateBio: (updatedBio: string) => void;
	updateAvatarUrl: (updatedAvatarUrl: string) => void;
    getUserById: (userId: number) => User | undefined;
}

export interface PostContextType {
	posts: Post[];
	setPosts: Post[] | Dispatch<SetStateAction<Post[]>>;
	comments: Comment[];
	setComments: Comment[] | Dispatch<SetStateAction<Comment[]>>;
	likes: Like[];
	setLikes: Like[] | Dispatch<SetStateAction<Like[]>>;
	createPost: (authorId: number, content: string, title?: string) => void;
	toggleLike: (postId: number, authorId: number) => void;
	getTotalLikeByPostId: (postId: number) => number;
	isPostLikedByAuthor: (postId: number, authorId: number) => Like | undefined;
}