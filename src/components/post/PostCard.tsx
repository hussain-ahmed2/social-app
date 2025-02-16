import { Post } from "@/types";
import PostAuthor from "./PostAuthor";
import LikeBtn from "./LikeBtn";
import Link from "next/link";

export default function PostCard({
	content,
	title,
	authorId,
	updatedAt,
	id,
	imageUrl
}: Post) {
	return (
		<article className="border p-5 rounded-lg shadow-sm bg-neutral-100">
			<div className="mb-4">
				<PostAuthor authorId={authorId} postId={id} />
			</div>
			<div className="">
				<div className="bg-neutral-50 rounded-md py-2 px-4">
					<h2 className="text-xl font-medium text-neutral-950">
						{title}
					</h2>
					<p className="text-neutral-800 mt-2">{content}</p>
					{
						imageUrl && <img className="w-full mt-2" src={imageUrl} alt={`post-image-${id}`} />
					}
					<p className="text-neutral-500 text-[0.7rem] mt-2 text-right">
						{updatedAt}
					</p>
				</div>
			</div>
			<div className="mt-2 flex items-center justify-between">
				<LikeBtn postId={id} />
				<Link className="text-sky-500 font-light text-sm hover:underline" href={`/posts/${id}`}>Read more</Link>
			</div>
		</article>
	);
}
