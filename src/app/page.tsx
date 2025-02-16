"use client";

import PostTextarea from "@/components/home/PostTextarea";
import PostCard from "@/components/post/PostCard";
import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Home() {
	const { user } = useContext(AuthContext);
	const { getPosts } = useContext(PostContext);
	const posts = getPosts(10);
	useEffect(() => {
		if (!user) redirect("/login");
	}, [user]);
	return (
		<div className="px-5 sm:px-8 md:px-10 max-w-3xl container mx-auto">
			<div>
				<PostTextarea />
			</div>
			<div className="flex flex-col gap-5 mb-5">
				{
					posts && posts.map(post => <PostCard key={post.id} {...post} />)
				}
			</div>
		</div>
	);
}
