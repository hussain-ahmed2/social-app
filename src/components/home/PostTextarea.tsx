import { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AuthContext from "@/contexts/AuthContext";
import { UserCircle, X } from "lucide-react";
import PostContext from "@/contexts/PostContext";

export default function PostTextarea() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { user } = useContext(AuthContext);
    const { createPost } = useContext(PostContext);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [post, setPost] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

	function handleCancel() {
		setIsModalOpen(false);
        setPost("");
	}

	function handlePost(event: FormEvent) {
        event.stopPropagation();
        if (!post.trim()) {
            setError(true);
            textareaRef.current?.focus();
            return;
        }
        if (user) {
            createPost(user.id, post);
            setPost("");
            setIsModalOpen(false);
        }
	}

    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
        setPost(event.target.value);
        if (post.trim()) {
            setError(false);
        } else {
            setError(true);
        }
    }

	useEffect(() => {
		if (isModalOpen) {
			textareaRef.current?.focus();
		}
	}, [isModalOpen]);
	return (
		<div className="flex flex-col py-5 container mx-auto">
			<button
				onClick={() => setIsModalOpen(true)}
				className="bg-neutral-100 px-6 py-3 rounded-full text-neutral-600 text-left hover:bg-neutral-300 transition-colors"
			>
				What's on your mind?
			</button>

			<div
				onClick={handleCancel}
				className={`absolute top-0 left-0 right-0 z-10 flex justify-center items-center h-screen bg-neutral-700/30 ${
					isModalOpen ? "block" : "hidden"
				}`}
			>
				<div className="w-full max-w-7xl p-5 sm:p-8 md:p-10">
					<div
						onClick={(event) => event.stopPropagation()}
						className={` bg-white px-5 py-3 shadow rounded-lg flex flex-col container mx-auto z-20`}
					>
						<div className="relative">
							<h2 className="text-center pb-4 border-b pt-1 text-xl font-bold">
								Create Post
							</h2>
							<button
								onClick={handleCancel}
								className="absolute top-1 right-0 p-1 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors"
							>
								<X />
							</button>
						</div>
						<div>
							<Link
								className="font-medium flex items-center gap-3 my-4"
								href={"/user"}
							>
								<div>
									{user?.avatarUrl ? (
										<img
											src={user.avatarUrl}
											alt={user.name}
											className="w-8 h-8 rounded-full object-cover group-hover:opacity-70 border"
										/>
									) : (
										<div className="group-hover:opacity-70">
											<UserCircle size={32} />
										</div>
									)}
								</div>
								<h3>{user?.name}</h3>
							</Link>
						</div>
						<textarea
							ref={textareaRef}
							className={`p-3 rounded-lg w-full bg-white border shadow-sm focus:ring-2 ${
								error ? "ring-rose-500" : "ring-sky-500 "
							}`}
							rows={3}
							name="post"
							id="post"
							placeholder="What's on your mind?"
							value={post}
							onChange={handleChange}
						></textarea>
						<button
							onClick={handlePost}
							className="my-3 py-2 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition-colors"
						>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
