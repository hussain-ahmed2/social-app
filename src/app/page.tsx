"use client";

import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Home() {
	const { user } = useContext(AuthContext);
	return (
		<div>
			<h1 className="text-center font-bold text-2xl">Latest posts</h1>
			<div className="flex flex-col gap-5 p-5 max-w-3xl mx-auto">
				
			</div>
		</div>
	);
}
