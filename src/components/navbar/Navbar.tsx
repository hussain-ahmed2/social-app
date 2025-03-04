import Link from "next/link";
import AuthBar from "./AuthBar";

export default function Navbar() {
	return (
		<nav className="fixed top-0 left-0 right-0 bg-white border-b py-3 z-50">
			<div className="flex justify-between max-w-3xl mx-auto px-5 items-center">
				<Link className="font-bold text-2xl" href={"/"}>
					PostBook
				</Link>
				<Link className="hover:underline hover:text-sky-500" href="/posts">
					Posts
				</Link>
				<div className="flex gap-8 items-center">
					<AuthBar />
				</div>
			</div>
		</nav>
	);
}
