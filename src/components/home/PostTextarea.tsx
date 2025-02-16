import {
	ChangeEvent,
	FormEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import Link from "next/link";
import AuthContext from "@/contexts/AuthContext";
import { Heading, Image, UserCircle, X } from "lucide-react";
import PostContext from "@/contexts/PostContext";

interface EnabledInputBoxType {
	title: boolean;
	imageUrl: boolean;
}
const enabledInputBoxInitialState: EnabledInputBoxType = {
	title: false,
	imageUrl: false,
};

interface Errors {
	title: boolean;
	imageUrl: boolean;
	content: boolean;
}

const errorsInitialState: Errors = {
	title: false,
	imageUrl: false,
	content: false,
};

export interface PostData {
	title: string;
	content: string;
	imageUrl: string;
}
const initialPostDataState: PostData = {
	title: "",
	content: "",
	imageUrl: "",
};

export default function PostTextarea() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const { user } = useContext(AuthContext);
	const { createPost } = useContext(PostContext);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [postData, setPostData] = useState<PostData>(initialPostDataState);
	const [errors, setErrors] = useState<Errors>(errorsInitialState);
	const [enabledInputBox, setEnabledInputBox] = useState<EnabledInputBoxType>(
		enabledInputBoxInitialState
	);

	function toggleEnabled(type: keyof EnabledInputBoxType) {
		setEnabledInputBox((prev) => ({ ...prev, [type]: !prev[type] }));
		setPostData((prev) => ({ ...prev, [type]: "" }));
		setErrors((prev) => ({ ...prev, [type]: false }));
	}

	function handleCancel() {
		setIsModalOpen(false);
		setPostData(initialPostDataState);
	}

	function handlePost(event: FormEvent) {
		event.stopPropagation();
		if (!postData.content.trim()) {
			setErrors((prev) => ({ ...prev, content: true }));
			textareaRef.current?.focus();
		}

		if (enabledInputBox.title && !postData.title.trim()) {
			setErrors((prev) => ({ ...prev, title: true }));
		}

		if (enabledInputBox.imageUrl && !postData.imageUrl.trim()) {
			setErrors((prev) => ({ ...prev, imageUrl: true }));
		}

		if (
			!postData.content.trim() ||
			(enabledInputBox.title && !postData.title.trim()) ||
			(enabledInputBox.imageUrl && !postData.imageUrl.trim())
		) {
			console.log(errors);
			return;
		}

		if (user) {
			createPost(user.id, postData);
			setPostData(initialPostDataState);
			setErrors(errorsInitialState);
			setEnabledInputBox(enabledInputBoxInitialState);
			setIsModalOpen(false);
		}
	}

	function handleChange(
		event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) {
		const { value, name } = event.target;
		setPostData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: false }));
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
								errors.content && "border-rose-500"
							}`}
							rows={3}
							name="content"
							id="post"
							placeholder="What's on your mind?"
							value={postData.content}
							onChange={handleChange}
						></textarea>
						<div
							className={`${
								enabledInputBox.title ? "block" : "hidden"
							} flex items-center mt-2`}
						>
							<input
								type="text"
								name="title"
								className={`${
									errors.title && "border-rose-500"
								} border p-2 rounded-s-md focus:ring-2 ring-sky-500 w-full`}
								placeholder="Post title"
								value={postData.title}
								onChange={handleChange}
							/>
							<button
								onClick={() => toggleEnabled("title")}
								className="p-2 border rounded-e-md"
							>
								<X />
							</button>
						</div>
						<div
							className={`${
								enabledInputBox.imageUrl ? "block" : "hidden"
							} flex items-center mt-2`}
						>
							<input
								type="text"
								name="imageUrl"
								className={`${
									errors.imageUrl && "border-rose-500"
								} border p-2 rounded-s-md focus:ring-2 ring-sky-500 w-full`}
								placeholder="Image url"
								value={postData.imageUrl}
								onChange={handleChange}
							/>
							<button
								onClick={() => toggleEnabled("imageUrl")}
								className="p-2 border rounded-e-md"
							>
								<X />
							</button>
						</div>
						<div className="flex items-center gap-4 mt-3 mb-1 text-sm text-neutral-800">
							<button
								onClick={() => toggleEnabled("imageUrl")}
								className="flex items-center gap-2 bg-neutral-100 p-2 rounded-md hover:bg-neutral-200 transition-colors active:scale-95"
							>
								<Image /> <span>Add image url</span>
							</button>
							<div className="w-px bg-neutral-300 h-7"></div>
							<button
								onClick={() => toggleEnabled("title")}
								className="flex items-center gap-2 bg-neutral-100 p-2 rounded-md hover:bg-neutral-200 transition-colors active:scale-95"
							>
								<Heading /> <span>Add heading</span>
							</button>
						</div>
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
