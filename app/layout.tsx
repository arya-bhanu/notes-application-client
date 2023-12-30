import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-quill/dist/quill.snow.css';

import GlobalProvider from '@/providers/global-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dibimbing.id | Notes',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<GlobalProvider>{children}</GlobalProvider>
			</body>
		</html>
	);
}
