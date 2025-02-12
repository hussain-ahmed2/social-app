"use client";

import AuthContext from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function AuthBar() {
	const { user, handleLogout } = useContext(AuthContext);
	return (
		<>
			{user ? (
				<>
					<div className="flex items-center gap-3">
						<Link className="font-medium hover:underline text-sky-500" href={"/user"}>{user.name}</Link>
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
