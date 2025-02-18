import AuthContext from "@/contexts/AuthContext";
import { Comment as CommentType } from "@/types";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function Comment({ comment }: { comment: CommentType }) {
	const { getUserById, user } = useContext(AuthContext);
	const userData = getUserById(comment.authorId);
	return (
		<div className="bg-neutral-100 p-1 rounded flex flex-col">
			<Link
				href={`/user${
					user?.id === comment.authorId ? "" : `/${comment.authorId}`
				}`}
				className="flex items-center gap-2 text-[0.75rem] group w-fit"
			>
				{userData?.avatarUrl ? (
					<img
						className="w-5 h-5 rounded-full"
						src={userData.avatarUrl}
						alt=""
					/>
				) : (
					<UserCircle size={20} />
				)}
				<p className="group-hover:text-sky-500">{userData?.name}</p>
			</Link>
			<div className="mt-2">
				<p className="ms-6">{comment.content}</p>
				<p className="font-light text-[0.65rem] text-right me-1 text-neutral-500">
					{comment.createdAt}
				</p>
			</div>
		</div>
	);
}
