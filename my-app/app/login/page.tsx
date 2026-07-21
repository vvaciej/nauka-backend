'use client'

export default function Register() {
  return (
		<div className='h-screen flex justify-center items-center bg-black'>
			<div className='w-125 rounded-2xl bg-white p-8 shadow-xl'>
				<h1 className='text-3xl font-bold text-center text-gray-700 mb-8'>Login to Account</h1>
				<form className='flex flex-col gap-5'>
					<input
						type='email'
						placeholder='e-mail'
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500'
					/>
					<input
						type='password'
						placeholder='Password'
						className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:border-blue-500`}
					/>
				</form>
			</div>
		</div>
	);
}