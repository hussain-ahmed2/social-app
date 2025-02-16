"use client";

import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import { redirect, useParams } from "next/navigation";
import { useContext } from "react";

export default function page() {
	const { id } = useParams();
    const postId = Number(id);
    const {user} = useContext(AuthContext);
    const {getPostById} = useContext(PostContext);
    const post = getPostById(postId);

    if(!user) {
        redirect("/login");
    }

    if(!post) {
        return <div>post not found</div>
    }

    if(post.authorId !== user.id) {
        return <div>unauthorized</div>
    }

	return <div>post id = {id}</div>;
}
