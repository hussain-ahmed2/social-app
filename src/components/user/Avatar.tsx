import AuthContext from "@/contexts/AuthContext";
import { Edit3, Mail, UserCircle } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

export default function Avatar() {
	const { user, updateAvatarUrl } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(true);
    const inputRef = useRef<HTMLInputElement | null>(null);
	const [imageUrl, setImageUrl] = useState<string>(
		user?.avatarUrl ? user.avatarUrl : ""
	);
    const [imageError, setImageError] = useState<boolean>(false);

    function handleCancel() {
        setImageUrl(user?.avatarUrl || '');
        setIsEditing(false);
    }

    function handleSave() {
        updateAvatarUrl(imageUrl);
        setIsEditing(false);
    }

    useEffect(() => {
        if(isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    useEffect(() => {
		setImageError(false);
	}, [imageUrl]);

	return (
		<div className="flex items-center gap-3 relative">
			<div className="relative group">
				{user?.avatarUrl && !imageError ? (
					<img
						onError={(e) => setImageError(true)}
						src={user.avatarUrl}
						alt={user.name}
						className="w-12 h-12 rounded-full object-cover group-hover:opacity-70 border"
					/>
				) : (
					<div className="group-hover:opacity-70">
						<UserCircle size={48} />
					</div>
				)}
				<button
					onClick={() => setIsEditing(true)}
					className="invisible active:scale-95 group-hover:visible absolute bottom-0 right-0 text-blue-500 w-full h-full flex items-end justify-center rounded-full"
				>
					<Edit3 size={24} />
				</button>
			</div>
			<div
				className={`${
					isEditing ? "block" : "hidden"
				} absolute top-0 right-0 left-0 bg-white border flex flex-col shadow-sm rounded-md overflow-hidden p-4 w-full gap-2 font-normal text-base`}
			>
				<div className="border-b">
					{user?.avatarUrl && !imageError ? (
						<img
							onError={(e) => setImageError(true)}
							className="w-full max-w-40 border aspect-square shadow rounded-full mx-auto mb-4"
							src={imageUrl}
							alt={user?.name}
						/>
					) : (
						<div className="mx-auto w-fit shadow">
							<UserCircle size={160} />
						</div>
					)}
				</div>
				<label className="mt-2" htmlFor="imageUrl">
					Enter Image Url
				</label>
				<input
					className="border p-2 rounded"
					ref={inputRef}
					type="text"
					id="imageUrl"
					name="imageUrl"
					placeholder="enter your profile image url here..."
					value={imageUrl}
					onChange={(event) => setImageUrl(event.target.value)}
				/>
				<div className="flex items-center justify-end gap-4 mt-2 text-sm">
					<button
						onClick={handleCancel}
						className="active:scale-95 border px-6 py-2 rounded-md bg-neutral-500 hover:bg-neutral-700 text-white transition-colors"
					>
						Cancel
					</button>
					<button
						onClick={handleSave}
						className="active:scale-95 border px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white transition-colors"
					>
						Save
					</button>
				</div>
			</div>
			<div className="flex flex-col font-bold">
				<h2 className="text-lg">{user?.name}</h2>
				<div className="flex gap-1 items-center text-sm text-neutral-600">
					<Mail size={14} />
					<span className="">{user?.email}</span>
				</div>
			</div>
		</div>
	);
}
