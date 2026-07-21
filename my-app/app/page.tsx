import Link from 'next/link';

export default function Home() {
	return (
		<body className='bg-black h-screen flex justify-center w-screen'>
			<header className='h-20 w-5/6 flex items-center justify-between'>
				<div>
					<p className='text-2xl text-blue-200'>Nauka backend</p>
				</div>
				<div className='flex gap-6'>
					<Link
						href={'/register'}
						className='px-4 py-2 rounded-full text-white font-normal hover:bg-white hover:text-black transition-colors duration-100 cursor-pointer'>
						Register
					</Link>

					<Link href={'/login'} className='px-4 py-2 rounded-full text-white font-normal hover:bg-white hover:text-black transition-colors duration-100 cursor-pointer'>
						Login
					</Link>
				</div>
			</header>
		</body>
	);
}