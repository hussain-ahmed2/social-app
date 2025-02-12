"use client";

import AuthContext from "@/contexts/AuthContext";
import { User } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

export default function LoginPage() {
	const [userData, setUserData] = useState({
		email: "",
		password: "",
	});
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
	const { handleLogin, user } = useContext(AuthContext);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const response = handleLogin(userData as User);
		if (!response.email) setErrors(prev => ({...prev, email: true}));
		if (!response.password) setErrors(prev => ({...prev, password: true}));
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setUserData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	}

	useEffect(() => {
		if (user) redirect("/user");
	}, [user]);

	return (
		<div className="px-5">
			<div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl mt-10 shadow-md border">
				<h1 className="text-center text-3xl font-bold">Login</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4 mt-10 mb-5"
				>
					<div className="flex flex-col">
						<label className="font-medium mb-1" htmlFor="email">
							Email
						</label>
						<input
							className={`border rounded-md p-2 font-normal ${errors.email ? "border-red-500" : ""}`}
							type="text"
							name="email"
							id="email"
							value={userData.email}
							onChange={handleChange}
						/>
					</div>
					<div className="flex flex-col">
						<label className="font-medium mb-1" htmlFor="password">
							Password
						</label>
						<input
							className={`border rounded-md p-2 font-normal ${errors.password ? "border-red-500" : ""}`}
							type="password"
							name="password"
							id="password"
							value={userData.password}
							onChange={handleChange}
						/>
					</div>
					<button
						className="border rounded-md p-3 font-bold bg-sky-500 text-white hover:bg-sky-600"
						type="submit"
					>
						Login
					</button>
				</form>
				<p className="text-center">
					Don&apos;t have an account?{" "}
					<Link
						className="text-sky-500 hover:underline"
						href="/register"
					>
						Register
					</Link>
				</p>
			</div>
		</div>
	);
}
