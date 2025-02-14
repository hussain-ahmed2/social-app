import useLocalStorage from "@/hooks/useLocalStorage";
import { Comment, Like, Post } from "@/types";
import PostContext from "./PostContext";
import { useEffect } from "react";

export default function PostProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [posts, setPosts] = useLocalStorage<Post[] | []>("posts", []);
	const [comments, setComments] = useLocalStorage<Comment[] | []>(
		"comments",
		[]
	);
	const [likes, setLikes] = useLocalStorage<Like[] | []>("likes", []);

	function createPost(authorId: number, content: string, title: string = "") {
		const id = posts.findLast(post => post.id)?.id || 0;
		const newPost: Post = {
			id: id + 1,
			authorId: authorId,
			title: title,
			content: content,
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString(),
		};
		setPosts(prev => [newPost, ...prev]);
	}

	return (
		<PostContext.Provider
			value={{ posts, setPosts, comments, setComments, likes, setLikes, createPost }}
		>
			{children}
		</PostContext.Provider>
	);
}
