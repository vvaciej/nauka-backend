'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const emailValid = email.trim().length >= 3;
	const passwordValid = password.trim().length >= 3;
	const formValid = emailValid && passwordValid;

	const [loggedIn, setLoggedIn] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await response.json();

		if (response.ok) {
			setEmail('');
			setPassword('');

			localStorage.setItem(
				'user',
				JSON.stringify({
					email: data.user.field_email,
				}),
			);

			alert('Zalogowano pomyślnie!');

			router.push('/');
		} else {
			alert(data.error);
		}
	};
		useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			setLoggedIn(true);
		}
	}, []);

	return (
		<div className='flex-1 flex justify-center'>
			{loggedIn ? (
				<h1 className='text-white text-3xl'>Jesteś już zalogowany!</h1>
			) : (
				<div className='w-125 rounded-2xl bg-white p-8 shadow-xl h-max'>
					<h1 className='text-3xl font-bold text-center text-gray-700 mb-8'>Login to Account</h1>

					<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
						<input
							type='email'
							placeholder='E-mail'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
						/>

						<input
							type='password'
							placeholder='Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
						/>

						<button
							type='submit'
							disabled={!formValid}
							className={`mt-4 rounded-lg py-3 text-white font-semibold transition-colors ${
								formValid ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
							}`}>
							Login
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
