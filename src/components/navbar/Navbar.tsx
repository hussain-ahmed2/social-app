import Link from "next/link";
import AuthBar from "./AuthBar";

export default function Navbar() {
	return (
		<nav className="fixed top-0 left-0 right-0 bg-white border-b py-3">
			<div className="flex justify-between max-w-7xl mx-auto px-5 items-center">
				<Link className="font-bold text-2xl" href={"/"}>
					PostBook
				</Link>
				<div className="flex gap-8 items-center">
					<AuthBar />
				</div>
			</div>
		</nav>
	);
}
