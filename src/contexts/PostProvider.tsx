import useLocalStorage from "@/hooks/useLocalStorage";
import { Comment, Like, Post } from "@/types";
import PostContext from "./PostContext";

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
		const id = posts.findLast((post) => post.id)?.id || 0;
		const newPost: Post = {
			id: id + 1,
			authorId: authorId,
			title: title,
			content: content,
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString(),
		};
		setPosts((prev) => [newPost, ...prev]);
	}

	function isPostLikedByAuthor(postId: number, authorId: number): Like | undefined {
		return likes.find(
			(like) => like.postId === postId && like.authorId === authorId
		);
	}

	function toggleLike(postId: number, authorId: number) {
		setLikes(prev => {
			const isExists = prev.find((like) => like.postId === postId && like.authorId === authorId);
			if (isExists) {
				return [...prev].filter(like => like.id !== isExists.id);
			}
			const id = prev.findLast((like) => like.id)?.id || 0;
			const newLike: Like = {
				id: id + 1,
				postId: postId,
				authorId: authorId,
				createdAt: new Date().toUTCString(),
				updatedAt: new Date().toUTCString(),
			};
			return [...prev, newLike];
		})
	}

	function getTotalLikeByPostId(postId: number): number {
		return likes.filter((like) => like.postId === postId).length;
	}

	return (
		<PostContext.Provider
			value={{
				posts,
				setPosts,
				comments,
				setComments,
				likes,
				setLikes,
				createPost,
				toggleLike,
				getTotalLikeByPostId,
				isPostLikedByAuthor,
			}}
		>
			{children}
		</PostContext.Provider>
	);
}
