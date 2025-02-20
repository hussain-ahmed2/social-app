"use client";

import AuthContext from "@/contexts/AuthContext";
import { LogOut, UserCircle } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function AuthBar() {
	const { user, handleLogout } = useContext(AuthContext);
	return (
		<>
			{user ? (
				<>
					<div className="flex items-center gap-3">
						<Link
							className="hover:underline text-sky-500 flex items-center gap-2 group"
							href={"/user"}
						>
							{user.name}
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
						</Link>
						<button onClick={handleLogout}>
							<LogOut />
						</button>
					</div>
				</>
			) : (
				<>
					<Link
						className="font-medium hover:underline hover:text-sky-500"
						href={"/login"}
					>
						Login
					</Link>
					<Link
						className="font-medium hover:underline hover:text-sky-500"
						href={"/register"}
					>
						Register
					</Link>
				</>
			)}
		</>
	);
}
