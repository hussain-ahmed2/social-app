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
	return (
		<PostContext.Provider
			value={{ posts, setPosts, comments, setComments, likes, setLikes }}
		>
			{children}
		</PostContext.Provider>
	);
}
