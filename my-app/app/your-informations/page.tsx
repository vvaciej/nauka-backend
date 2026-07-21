'use client';

import { useEffect, useState } from 'react';
import Header from '../components/HeaderPage';

export default function YourInformations() {
	const [user, setUser] = useState<any>(null);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		const savedUser = localStorage.getItem('user');

		if (savedUser) {
			const user = JSON.parse(savedUser);

			setUser(user);
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
		}
	}, []);

	if (!user) {
		return (
			<div className='w-full min-h-screen bg-black flex justify-center items-center'>
				<p className='text-white'>Nie jesteś zalogowany!</p>
			</div>
		);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch('/api/update-user', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: user.id,
				firstName,
				lastName,
				email,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			localStorage.setItem(
				'user',
				JSON.stringify({
					...user,
					firstName,
					lastName,
					email,
				}),
			);

			alert('Dane zostały zaktualizowane.');
		} else {
			alert(data.error);
		}
	};

	return (
		<div className='w-full min-h-screen bg-black flex flex-col gap-24 items-center'>
			<Header />

			<div className='w-125 rounded-2xl bg-white p-8 shadow-xl h-max'>
				<h1 className='text-3xl font-bold text-center text-gray-700 mb-8'>Your informations</h1>

				<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
					<input
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
					/>

					<input
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
					/>

					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
					/>

					<button
						type='submit'
						className='mt-4 rounded-lg py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 cursor-pointer'>
						Save
					</button>
				</form>
			</div>
		</div>
	);
}
