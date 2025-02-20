"use client";

import { PostData } from "@/components/home/PostTextarea";
import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import { redirect, useParams } from "next/navigation";
import { ChangeEvent, useContext, useState } from "react";

export default function page() {
	const { id } = useParams();
	const postId = Number(id);
	const { user } = useContext(AuthContext);
	const { getPostById, updatePostById, deletePost } = useContext(PostContext);
	const post = getPostById(postId);
    const [postData, setPostData] = useState<PostData>({
        title: post?.title || "",
        content: post?.content || "",
        imageUrl: post?.imageUrl || "",
    });
    const [deletePostConfirmation, setDeletePostConfirmation] = useState(false);

	if (!user) {
		redirect("/login");
	}

	if (!post) {
		redirect("/posts");
	}

	if (post.authorId !== user.id) {
		return <div>unauthorized</div>;
	}

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    }

    function handleUpdatePost() {
        updatePostById(postId, postData);
        redirect(`/posts/${postId}`);
    }

    function handleDeletePost() {
        deletePost(postId);
        redirect("/posts");
    }

	return (
		<div className="max-w-3xl mx-auto px-5 sm:px-8 md:px-10">
			<h1 className="text-center font-bold text-2xl my-5">Edit Post</h1>
			<div className="flex flex-col gap-3 bg-neutral-100 p-5 rounded-lg shadow">
				<div className="flex flex-col">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={handleChange}
						value={postData.title}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="content">Content</label>
					<textarea
						name="content"
						id="content"
						rows={4}
						className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={handleChange}
						value={postData.content}
					/>
				</div>
				<div className="flex flex-col">
					<label htmlFor="imageUrl">Image URL</label>
					<input
						type="text"
						name="imageUrl"
						id="imageUrl"
						className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						onChange={handleChange}
						value={postData.imageUrl}
					/>
				</div>
				<div className="flex gap-3 justify-between">
					<button
						onClick={() => setDeletePostConfirmation(true)}
						className="px-5 py-1 bg-rose-500 hover:bg-rose-600 rounded text-white"
					>
						Delete
					</button>
					<div className="flex gap-3">
						<button
							onClick={() => redirect(`/posts/${postId}`)}
							className="px-5 py-1 bg-neutral-500 hover:bg-neutral-600 rounded text-white"
						>
							Cancel
						</button>
						<button
							onClick={handleUpdatePost}
							className="px-5 py-1 bg-sky-500 hover:bg-sky-600 rounded text-white"
						>
							Save
						</button>
					</div>
				</div>
			</div>
			<div>
				{deletePostConfirmation && (
					<div className="flex gap-3 absolute top-0 right-0 left-0  justify-center items-center h-full p-6 bg-neutral-800/50">
						<div className="flex flex-col gap-3 items-center justify-center w-full bg-neutral-50 p-6 border rounded shadow-md">
							<p>Are you sure you want to delete this post?</p>
							<div className="flex gap-3">
								<button
									onClick={handleDeletePost}
									className="px-5 py-1 bg-rose-500 hover:bg-rose-600 rounded text-white"
								>
									Confirm
								</button>
								<button
									onClick={() =>
										setDeletePostConfirmation(false)
									}
									className="px-5 py-1 bg-neutral-500 hover:bg-neutral-600 rounded text-white"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
