import Header from '../components/HeaderPage';
import Login from '../components/LoginForm';

export default function Register() {

  return (
		<div className="w-full min-h-screen bg-black flex flex-col gap-24">
			<Header />

			<Login />
		</div>
	);
}