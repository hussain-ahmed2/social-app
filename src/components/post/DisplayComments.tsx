import PostContext from "@/contexts/PostContext";
import Link from "next/link";
import { useContext } from "react";
import Comment from "./Comment";

export default function DisplayComments({ postId, singleComment }: { postId: number, singleComment?: boolean }) {
	const { getCommentsByPostId } = useContext(PostContext);
	const comments = getCommentsByPostId(postId);
	return (
		<div className="mt-2 border w-full p-4 rounded-md bg-neutral-50 text-sm">
			{comments.length ? (
				<div className="flex flex-col gap-1">
					{comments.slice(0, singleComment ? 1 : comments.length).map((comment) => (
						<Comment key={comment.id} comment={comment} />
					))}
					{comments.length > 1 && singleComment && (
						<Link
							className="text-sky-500 font-light text-[.8rem] hover:underline self-end"
							href={`/posts/${postId}`}
						>
							Read more
						</Link>
					)}
				</div>
			) : (
				<p>No comments</p>
			)}
		</div>
	);
}
