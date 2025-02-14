"use client";

import AuthContext from "@/contexts/AuthContext";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";

export default function RegisterPage() {
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({
		email: false,
		password: false,
	})
	const { handleRegister, user } = useContext(AuthContext);

	function handleSubmit(event: FormEvent<HTMLFormElement>) {	
		event.preventDefault();
		if (userData.password !== userData.confirmPassword) {
			setErrors(prev => ({...prev, password: true}));
			return;
		}
		const {confirmPassword, ...userDetails} = userData;
		if (!handleRegister(userDetails)) {
			setErrors(prev => ({...prev, email: true}));
		}
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
			<div className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-2xl my-10 shadow-md border">
				<h1 className="text-center text-3xl font-bold">Register</h1>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-4 mt-10 mb-5"
				>
					<div className="flex flex-col">
						<label className="font-medium mb-1" htmlFor="name">
							Name
						</label>
						<input
							className="border rounded-md p-2 font-normal"
							type="text"
							name="name"
							id="name"
							onChange={handleChange}
							value={userData.name}
						/>
					</div>
					<div className="flex flex-col">
						<label className="font-medium mb-1" htmlFor="email">
							Email
						</label>
						<input
							className={`border rounded-md p-2 font-normal ${
								errors.email ? "border-red-500" : ""
							}`}
							type="text"
							name="email"
							id="email"
							onChange={handleChange}
							value={userData.email}
						/>
					</div>
					<div className="flex flex-col">
						<label className="font-medium mb-1" htmlFor="password">
							Password
						</label>
						<input
							className="border rounded-md p-2 font-normal"
							type="password"
							name="password"
							id="password"
							onChange={handleChange}
							value={userData.password}
						/>
					</div>
					<div className="flex flex-col">
						<label
							className="font-medium mb-1"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<input
							className={`border rounded-md p-2 font-normal ${
								errors.password ? "border-red-500" : ""
							}`}
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							onChange={handleChange}
							value={userData.confirmPassword}
						/>
					</div>
					<button
						className="border rounded-md p-3 font-bold bg-sky-500 text-white hover:bg-sky-600"
						type="submit"
					>
						Register
					</button>
				</form>
				<p className="text-center">
					already have an account?{" "}
					<Link
						className="text-sky-500 hover:underline"
						href="/login"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}
