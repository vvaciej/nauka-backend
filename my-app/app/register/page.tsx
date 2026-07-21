'use client';

import Header from '../components/HeaderPage';
import Register from '../components/RegisterForm';

export default function Page() {
	return (
		<div className='w-full min-h-screen bg-black flex flex-col gap-24'>
			<Header />

			<Register />
		</div>
	);
}
