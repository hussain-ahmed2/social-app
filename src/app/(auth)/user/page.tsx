"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";
import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";
import Bio from "@/components/user/Bio";
import Avatar from "@/components/user/Avatar";

export default function UserPage() {
	const { user } = useContext(AuthContext);
	useEffect(() => {
		if (!user) redirect("/login");
	}, [user]);
	return (
		<div>
			<div className="px-8 md:px-10 max-w-7xl mx-auto">
				<h1 className="text-center font-bold text-2xl my-5">Profile</h1>
				<div>
					<div>
						<Avatar />
					</div>
					<div>
						<Bio />
					</div>
				</div>
			</div>
		</div>
	);
}
