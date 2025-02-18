"use client";

import PostCard from "@/components/post/PostCard";
import PostContext from "@/contexts/PostContext";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";

export default function page() {
  const {id} = useParams();
  const {getPostById} = useContext(PostContext);
  const post = getPostById(Number(id));
  const [isEdit, setIsEdit] = useState(false);

	return (
		<div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-10 py-5">
			{post && <PostCard {...post} singleComment={false} />}
		</div>
	);
}
