"use client";

import { useContext } from "react";
import PostContext from "@/contexts/PostContext";
import PostCard from "@/components/post/PostCard";

export default function page() {
	const { getPosts } = useContext(PostContext);
	const posts = getPosts();
	return (
		<div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-10">
			<h1 className="text-center font-bold text-2xl my-5">All Posts</h1>
			<div className="flex flex-col gap-5 mb-5">
				{posts &&
					posts.map((post) => (
						<PostCard
							key={post.id}
							{...post}
							singleComment={true}
						/>
					))}
			</div>
		</div>
	);
}
