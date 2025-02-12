"use client";
import AuthProvider from "./AuthProvider";
import PostProvider from "./PostProvider";

export default function RootProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<PostProvider>
			<AuthProvider>{children}</AuthProvider>
		</PostProvider>
	);
}
