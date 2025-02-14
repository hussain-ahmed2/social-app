import AuthContext from "@/contexts/AuthContext";
import { UserCircle } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function PostAuthor({ authorId }: { authorId: number }) {
    const {getUserById, user} = useContext(AuthContext);
    const postUser = getUserById(authorId);
	return (
		<Link href={`/user${user?.id === authorId ? '' : `/${authorId}`}`}>
			<div className="flex items-center gap-2 group">
				{postUser?.avatarUrl ? (
					<img
						src={postUser.avatarUrl}
						alt={postUser.name}
						className="w-8 h-8 rounded-full object-cover border"
					/>
				) : (
					<div className="group-hover:opacity-70">
						<UserCircle size={32} />
					</div>
				)}
                <h3 className="font-semibold text-sm group-hover:text-sky-500 transition-colors">{postUser?.name}</h3>
			</div>
		</Link>
	);
}
