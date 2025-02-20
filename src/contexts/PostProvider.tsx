import useLocalStorage from "@/hooks/useLocalStorage";
import { Comment, Like, Post } from "@/types";
import PostContext from "./PostContext";
import { PostData } from "@/components/home/PostTextarea";

const Posts: Post[] = [
	{
		id: 1,
		authorId: 1,
		title: "First post",
		content: "This is my first post",
		imageUrl: "",
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
	{
		id: 2,
		authorId: 2,
		title: "Second post",
		content: "This is my second post",
		imageUrl: "",
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
	{
		id: 3,
		authorId: 3,
		title: "Third post",
		content: "This is my third post",
		imageUrl: "",
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
];

const Likes: Like[] = [
	{
		id: 1,
		postId: 1,
		authorId: 3,
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
	{
		id: 2,
		postId: 2,
		authorId: 1,
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
	{
		id: 3,
		postId: 3,
		authorId: 2,
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
];

const Comments: Comment[] = [
	{
		id: 1,
		postId: 1,
		authorId: 2,
		content: "This is my first comment",
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
	{
		id: 2,
		postId: 2,
		authorId: 3,
		content: "This is my second comment",
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
	{
		id: 3,
		postId: 3,
		authorId: 1,
		content: "This is my third comment",
		createdAt: new Date().toUTCString(),
		updatedAt: new Date().toUTCString(),
	},
];

export default function PostProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [posts, setPosts] = useLocalStorage<Post[] | []>("posts", Posts);
	const [comments, setComments] = useLocalStorage<Comment[] | []>(
		"comments",
		Comments
	);
	const [likes, setLikes] = useLocalStorage<Like[] | []>("likes", Likes);

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

	function getPosts(limit?: number): Post[] {
		return posts.slice(0, limit || posts.length).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
	}

	function createComment(postId: number, authorId: number, content: string) {
		const id = comments.findLast((comment) => comment.id)?.id || 0;
		const newComment: Comment = {
			id: id + 1,
			postId: postId,
			authorId: authorId,
			content: content,
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString(),
		};
		setComments((prev) => [...prev, newComment]);
	}

	function getCommentsByPostId(postId: number): Comment[] {
		return comments.filter((comment) => comment.postId === postId).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
	}

	function updatePostById(postId: number, postData: PostData) {
		setPosts(prev => prev.map(post => post.id === postId ? {...post, ...postData, updatedAt: new Date().toUTCString()} : post));
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
				getPostById,
				createComment,
				getCommentsByPostId,
				updatePostById,
			}}
		>
			{children}
		</PostContext.Provider>
	);
}
