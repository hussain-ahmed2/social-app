import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import { ThumbsUp } from "lucide-react";
import { useContext } from "react";

export default function LikeBtn({
	postId
}: {
	postId: number;
}) {
	const { getTotalLikeByPostId, toggleLike, isPostLikedByAuthor } =
		useContext(PostContext);
	const { user } = useContext(AuthContext);
	return (
		<div className="grid grid-cols-2 bg-white w-fit rounded-full overflow-hidden shadow-sm">
			<p className="font-medium text-lg text-gray-700 flex justify-center items-center p-1">
				{getTotalLikeByPostId(postId)}
			</p>
			{user && (
				<button
					onClick={() => toggleLike(postId, user?.id)}
					className="bg-neutral-50 border p-2 rounded-full hover:bg-neutral-200"
				>
					<ThumbsUp
						fill={`${
							isPostLikedByAuthor(postId, user?.id)
								? "#0ea5e9"
								: "white"
						}`}
						size={18}
					/>
				</button>
			)}
		</div>
	);
}
