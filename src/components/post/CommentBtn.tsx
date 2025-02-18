import AuthContext from "@/contexts/AuthContext";
import PostContext from "@/contexts/PostContext";
import { MessageCircleIcon } from "lucide-react";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";

export default function CommentBtn({ postId }: { postId: number }) {
	const { getCommentsByPostId, createComment } = useContext(PostContext);
	const {user} = useContext(AuthContext);
	const comments = getCommentsByPostId(postId);
	const [content, setContent] = useState<string>("");
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const [error, setError] = useState<boolean>(false);

	function toggleEditing() {
		setIsEditing(prev => !prev);
	}

	function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setError(false);
		setContent(event.target.value);
	}

	function handleSend() {
		if (!content.trim()) {
			setError(true);
			return;
		}
		if (user) {
			createComment(postId, user?.id, content);
		}
		setError(false);
		setContent("");
		setIsEditing(false);
	}

	useEffect(() => {
		if (isEditing) {
			textareaRef.current?.focus();
		}
	}, [isEditing]);

	return (
		<>
			<div className="w-1/2 flex items-center gap-3">
				<p>Comments</p>
				<div className="grid grid-cols-2 bg-white w-fit rounded-full overflow-hidden shadow-sm">
					<p className="font-medium text-lg text-gray-700 flex justify-center items-center p-1">
						{comments.length}
					</p>
					<button
						onClick={toggleEditing}
						className="bg-neutral-50 border p-2 rounded-full hover:bg-neutral-200"
					>
						<MessageCircleIcon size={18} />
					</button>
				</div>
			</div>
			{isEditing && (
				<div className="flex flex-col w-full mt-2">
					<textarea
						ref={textareaRef}
						placeholder="Add a comment"
						rows={2}
						className={`border p-2 rounded-md placeholder:text-sm ${error ? "border-rose-500": "border-sky-500"}`}
						name="comment"
						value={content}
						onChange={handleChange}
					></textarea>
					<div className="flex items-center justify-end gap-4 mt-1">
						<button
							onClick={toggleEditing}
							className="border px-5 py-1 rounded text-sm bg-neutral-600 text-white hover:bg-neutral-700"
						>
							Cancel
						</button>
						<button onClick={handleSend} className="border px-5 py-1 rounded text-sm bg-sky-600 text-white hover:bg-sky-700">
							Send
						</button>
					</div>
				</div>
			)}
		</>
	);
}
