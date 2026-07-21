'use client'

import { useState, useEffect } from "react";
import Header from "../components/HeaderPage"

export default function User() {
  const [user, setUser] = useState<any>(null);

  const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
			const savedUser = localStorage.getItem('user');

			if (savedUser) {
				setUser(JSON.parse(savedUser));
			}
		}, []);

  if (!user) {
    return <p className='text-white'>Nie jesteś zalogowany!</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch('../api/change-password', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: user.email,
				currentPassword,
				newPassword,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			alert('Hasło zostało zmienione.');

			setCurrentPassword('');
			setNewPassword('');
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
						value={user.firstName}
						placeholder='Name'
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
					/>

					<input
						value={user.lastName}
						placeholder='Last Name'
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
					/>

					<input
						value={user.email}
						type='email'
						placeholder='Your Email'
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
					/>

					<input
						type='password'
						placeholder='Your Current Password'
						value={currentPassword}
						onChange={e => setCurrentPassword(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
					/>

					<input
						type='password'
						placeholder='Your New Password'
						value={newPassword}
						onChange={e => setNewPassword(e.target.value)}
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
					/>

					<button
						type='submit'
						className={`mt-4 rounded-lg py-3 text-white font-semibold transition-colors bg-blue-600 hover:bg-blue-700 cursor-pointer`}>
						Save
					</button>
				</form>
			</div>
		</div>
	);
}