"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import { Mail, UserCircle } from "lucide-react";

export default function UserPage() {
	const { user } = useContext(AuthContext);
	useEffect(() => {
		if (!user) redirect("/login");
	}, [user]);
	return (
		<div className="px-8 md:px-10">
			<h1 className="text-center font-bold text-2xl my-5">Profile</h1>
			<div>
				<div className="flex items-center gap-3 font-bold">
					{user?.avatarUrl ? (
						<img
							src={user.avatarUrl}
							alt={user.name}
							className="w-12 h-12 rounded-full object-cover"
						/>
					) : (
						<UserCircle size={48} />
					)}
					<div className="flex flex-col">
						<h2 className="text-lg">
							{user?.name}
						</h2>
						<div className="flex gap-1 items-center text-sm text-neutral-600">
							<Mail size={14} />
							<span className="">{user?.email}</span>
						</div>
					</div>
				</div>

				<div className="mt-5 border p-5 text-sm rounded-xl shadow-sm">
					<h3 className="font-semibold text-lg">Bio:</h3>
					{user?.bio ? (
						<p className="text-neutral-700 mt-3">{user.bio}</p>
					) : (
						<p className="text-neutral-500 mt-3">
							No bio was provided
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
