import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import RootProvider from "@/contexts/RootProvider";
import Navbar from "@/components/navbar/Navbar";

const karla = Karla({
	variable: "--font-karla",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Social App",
	description: "This is a social app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${karla.className} antialiased bg-neutral-200`}>
				<RootProvider>
					<div>
						<Navbar />
					</div>
					<div className="pt-16">{children}</div>
				</RootProvider>
			</body>
		</html>
	);
}
