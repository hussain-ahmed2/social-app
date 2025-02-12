import { Post, User, Comment, Like } from "@/types";
import AuthContext from "./AuthContext";
import { redirect } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function AuthProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [user, setUser] = useLocalStorage<User | null>("user", null);
	const [users, setUsers] = useLocalStorage<User[] | []>("users", []);

	function handleRegister(userData: User) {
		const existingUser = users.find(
			(user) => user.email === userData.email
		);
		if (existingUser) {
			return false;
		}
		const id = users.findLast((user) => user.id)?.id || 0;
		const newUser = {
			id: id + 1,
			name: userData.name,
			email: userData.email,
			password: userData.password,
			avatarUrl: "",
			bio: "",
			createdAt: new Date().toUTCString(),
			updatedAt: new Date().toUTCString(),
		};
		setUsers((prevUsers) => [...prevUsers, newUser]);
		redirect("/login");
	}

	function handleLogin(userData: User) {
		const response: { email: boolean; password: boolean } = {
			email: true,
			password: true,
		};
		const existingUser = users.find(
			(user) => user.email === userData.email
		);
		if (!existingUser) {
			response.email = false;
		} else if (existingUser?.password !== userData.password) {
			response.password = false;
		} else {
			setUser(existingUser);
		}

		return response;
	}

	function handleLogout() {
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				handleRegister,
				handleLogin,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}
