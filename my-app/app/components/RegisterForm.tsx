'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
	const router = useRouter();

	useEffect(() => {
		fetch('http://localhost/drupal10/jsonapi/node/nauka_backend')
			.then(res => res.json())
			.then(data => console.log(data));
	}, []);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [loggedIn, setLoggedIn] = useState(false);

	const onlyLetters = (value: string) => {
		return value.replace(/[^a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]/g, '');
	};

	const validateEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const validatePassword = (password: string) => {
		const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,#?])[A-Za-z\d@$!%*?&.,#?]{8,}$/;

		return regex.test(password);
	};

	const emailValid = validateEmail(email);
	const passwordValid = validatePassword(password);
	const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

	const formValid =
		firstName.trim().length >= 2 && lastName.trim().length >= 5 && emailValid && passwordValid && passwordsMatch;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: {
						type: 'node--nauka_backend',
						attributes: {
							title: `${firstName} ${lastName}`,
							field_imie: firstName,
							field_nazwisko: lastName,
							field_email: email,
							field_password: password,
						},
					},
				}),
			});

			if (response.ok) {
				setFirstName('');
				setLastName('');
				setEmail('');
				setPassword('');
				setConfirmPassword('');

				alert('Rejestracja zakończona sukcesem!');
				router.push('/login');
			} else {
				alert('Błąd podczas rejestracji.');
			}
		} catch (err) {
			console.error(err);
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
					<h1 className='text-3xl font-bold text-center text-gray-700 mb-8'>Create Account</h1>

					<form onSubmit={handleSubmit} className='flex flex-col gap-5'>
						<input
							type='text'
							placeholder='First Name'
							value={firstName}
							onChange={e => setFirstName(onlyLetters(e.target.value))}
							maxLength={15}
							className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
						/>

						<input
							type='text'
							placeholder='Last Name'
							value={lastName}
							onChange={e => setLastName(onlyLetters(e.target.value))}
							maxLength={30}
							className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
						/>

						<input
							type='email'
							placeholder='Email'
							value={email}
							onChange={e => setEmail(e.target.value)}
							className={`border rounded-lg px-4 py-3 text-gray-700 outline-none ${
								email.length === 0 ? 'border-gray-300' : emailValid ? 'border-green-500' : 'border-red-500'
							}`}
						/>

						<input
							type='password'
							placeholder='Password'
							value={password}
							onChange={e => setPassword(e.target.value)}
							className={`border rounded-lg px-4 py-3 text-gray-700 outline-none ${
								password.length === 0 ? 'border-gray-300' : passwordValid ? 'border-green-500' : 'border-red-500'
							}`}
						/>

						<input
							type='password'
							placeholder='Confirm Password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							className={`border rounded-lg px-4 py-3 text-gray-700 outline-none ${
								confirmPassword.length === 0
									? 'border-gray-300'
									: passwordsMatch
										? 'border-green-500'
										: 'border-red-500'
							}`}
						/>

						<button
							type='submit'
							disabled={!formValid}
							className={`mt-4 rounded-lg py-3 text-white font-semibold transition-colors ${
								formValid ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'
							}`}>
							Register
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
