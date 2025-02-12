import { Dispatch, SetStateAction } from "react";

export interface User {
    id?: number;
    name: string;
    email: string;
    password: string;
    avatarUrl?: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Post {
    id: string;
    title?: string;
    content: string;
    imageUrl?: string;
    authorId: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: string;
    content: string;
    postId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}

export interface Like {
    id: string;
    postId: string;
    authorId: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthContextType {
	user: User | null;
	setUser: User | Dispatch<SetStateAction<User | null>> | null;
    handleRegister: (user: User) => boolean;
    handleLogin: (user: User) => { email: boolean; password: boolean };
    handleLogout: () => void;
}

export interface PostContextType {
	posts: Post[] | [];
	setPosts: Post[] | Dispatch<SetStateAction<Post[]>>;
	comments: Comment[] | [];
	setComments: Comment[] | Dispatch<SetStateAction<Comment[]>>;
	likes: Like[] | [];
	setLikes: Like[] | Dispatch<SetStateAction<Like[]>>;
}