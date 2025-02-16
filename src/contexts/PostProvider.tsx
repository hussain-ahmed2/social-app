import useLocalStorage from "@/hooks/useLocalStorage";
import { Comment, Like, Post } from "@/types";
import PostContext from "./PostContext";
import { PostData } from "@/components/home/PostTextarea";

export default function PostProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [posts, setPosts] = useLocalStorage<Post[] | []>("posts", []);
	const [comments, setComments] = useLocalStorage<Comment[] | []>(
		"comments",
		[]
	);
	const [likes, setLikes] = useLocalStorage<Like[] | []>("likes", []);

	function createPost(authorId: number, postData: PostData) {
		const id = posts.findLast((post) => post.id)?.id || 0;
		const newPost: Post = {
			id: id + 1,
			authorId: authorId,
			title: postData.title,
			content: postData.content,
			imageUrl: postData.imageUrl,
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString(),
		};
		setPosts((prev) => [...prev, newPost]);
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

	function deletePost(postId: number) {
		setPosts(prev => prev.filter(post => post.id !== postId));
		setComments(prev => prev.filter(comment => comment.postId !== postId));
		setLikes(prev => prev.filter(like => like.postId !== postId));
	}

	function getTotalLikeByPostId(postId: number): number {
		return likes.filter((like) => like.postId === postId).length;
	}

	function getPostById(postId: number): Post | undefined {
		return posts.find((post) => post.id === postId);
	}

	function getPosts(limit: number): Post[] {
		return posts.slice(0, limit).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
	}

	return (
		<PostContext.Provider
			value={{
				getPosts,
				createPost,
				toggleLike,
				getTotalLikeByPostId,
				isPostLikedByAuthor,
				deletePost,
				getPostById
			}}
		>
			{children}
		</PostContext.Provider>
	);
}
