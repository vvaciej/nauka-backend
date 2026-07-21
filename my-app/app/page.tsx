'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	const [user, setUser] = useState<{ email: string } | null>(null);

	useEffect(() => {
		const savedUser = localStorage.getItem('user');

		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}
	}, []);

	const logoutClick = () => {
		localStorage.removeItem('user');
		setUser(null);
		router.push('/');
	}
	
	return (
		<div className='bg-black h-screen flex justify-center w-screen'>
			<header className='h-20 w-5/6 flex items-center justify-between'>
				<div>
					<p className='text-2xl text-blue-200'>Nauka backend</p>
				</div>
				<div className='flex gap-6 items-center'>
					{user ? (
						<>
							<p className='font-bold'>{user.email}</p>
							<button
								onClick={logoutClick}
								className='px-4 py-2 rounded-full text-white font-normal hover:bg-white hover:text-red-600 transition-colors duration-100 cursor-pointer'>
								Logout
							</button>
						</>
					) : (
						<>
							<Link
								href={'/register'}
								className='px-4 py-2 rounded-full text-white font-normal hover:bg-white hover:text-black transition-colors duration-100 cursor-pointer'>
								Register
							</Link>

							<Link
								href={'/login'}
								className='px-4 py-2 rounded-full text-white font-normal hover:bg-white hover:text-black transition-colors duration-100 cursor-pointer'>
								Login
							</Link>
						</>
					)}
				</div>
			</header>
		</div>
	);
}