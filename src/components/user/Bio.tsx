import AuthContext from "@/contexts/AuthContext";
import { Edit, Edit3 } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

export default function Bio() {
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { user, updateBio } = useContext(AuthContext);
	const [bio, setBio] = useState<string>(user?.bio ? user.bio : "");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	function handleEdit() {
		setIsEditing(true);
	}

	function handleCancel() {
		setBio(user?.bio ? user.bio : "");
		setIsEditing(false);
	}

	function handleSave() {
		setIsEditing(false);
		updateBio(bio);
	}

	useEffect(() => {
		if (isEditing) {
			textareaRef.current?.focus();
		}
	}, [isEditing]);

	return (
		<div className="mt-5 border p-5 text-sm rounded-xl shadow-sm bg-neutral-50">
			<div className="flex justify-between items-center">
				<h3 className="font-semibold text-lg">Bio:</h3>
				<button
					onClick={handleEdit}
					className={`flex items-center justify-end gap-1 cursor-pointer ${
						isEditing ? "text-sky-500" : "hover:text-sky-500"
					}`}
				>
					{isEditing ? (
						<>
							<p>Editing</p>
							<Edit3 size={16} />
						</>
					) : (
						<>
							<p className="">Edit bio</p>
							<Edit size={16} />
						</>
					)}
				</button>
			</div>
			<div className="mt-3">
				{user?.bio && !isEditing ? (
					<p>{user.bio}</p>
				) : isEditing ? (
					<div className="">
						<textarea
							disabled={!isEditing}
							ref={textareaRef}
							className={`w-full p-3 rounded-md ${
								isEditing ? "border" : "cursor-default"
							}`}
							rows={4}
							placeholder="type here..."
							value={bio}
							onChange={(event) => setBio(event.target.value)}
						></textarea>

						<div className="flex items-center justify-end gap-4 mt-2">
							<button
								onClick={handleCancel}
								className="border px-6 py-2 rounded-md bg-neutral-500 hover:bg-neutral-700 text-white transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={handleSave}
								className="border px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white transition-colors"
							>
								Save
							</button>
						</div>
					</div>
				) : (
					<p className="text-neutral-500 mt-3">No bio yet</p>
				)}
			</div>
		</div>
	);
}
