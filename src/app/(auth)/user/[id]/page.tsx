"use client";

import AuthContext from "@/contexts/AuthContext";
import { UserCircle } from "lucide-react";
import { notFound, useParams } from "next/navigation";
import { useContext, useState } from "react";

export default function page() {
	const [imageError, setImageError] = useState<boolean>(false);
	const { id } = useParams();
	const { getUserById } = useContext(AuthContext);

	const user = getUserById(Number(id));

	if (!user)
		return (
			<div className="flex items-center justify-center mt-20 text-3xl font-bold">
				User not found
			</div>
		);

	return (
		<div className="max-w-3xl mx-auto container px-5 sm:px-8 md:px-10">
			<h1 className="text-center font-bold text-2xl my-5">Profile</h1>
			<div className="">
				<div className="flex items-center gap-3">
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
					<h2 className="text-lg font-bold">{user?.name}</h2>
				</div>
				<div className="mt-5 border border-gray-300 rounded-md p-5 shadow">
					<h3 className="font-semibold text-lg">Bio:</h3>
					<p className="mt-2 font-light text-sm">
						{" "}
						{user?.bio ? user.bio : "No bio"}{" "}
					</p>
				</div>
			</div>
		</div>
	);
}
