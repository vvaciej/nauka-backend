'use client'

import { useState } from "react";
import { useRouter } from 'next/navigation';

import Header from '../components/HeaderPage';
import Login from '../components/LoginForm';

export default function Register() {
	const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordValid = password.trim().length >= 3;
  const emailValid = email.trim().length >= 3;

  const formValid = emailValid && passwordValid;

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
		}
	};

  return (
		<div className="w-full min-h-screen bg-black flex flex-col gap-24">
			<Header />

			<Login />
		</div>
	);
}