import { Post } from "@/types";
import PostAuthor from "./PostAuthor";
import { ThumbsUp } from "lucide-react";

export default function PostCard({
	content,
	title,
	authorId,
	updatedAt,
}: Post) {
	return (
		<article className="border p-5 rounded-lg shadow-sm bg-neutral-100 container mx-auto">
			<div className="mb-4">
				<PostAuthor authorId={authorId} />
			</div>
			<div className="">
				<div className="bg-neutral-50 rounded-md py-2 px-4">
					<h2 className="text-xl font-medium text-neutral-950">
						{title}
					</h2>
					<p className="text-neutral-800 mt-2">{content}</p>
				<p className="text-neutral-500 text-[0.7rem] mt-2 text-right">
					{updatedAt}
				</p>
				</div>
			</div>
			<div className="mt-2">
				<button className="rounded-full border p-2 bg-white">
					<ThumbsUp size={20} />
				</button>
			</div>
		</article>
	);
}
