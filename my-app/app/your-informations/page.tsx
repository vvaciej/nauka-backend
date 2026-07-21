import Header from "../components/HeaderPage"

export default function YourInformations() {
  return (
		<div className='w-full min-h-screen bg-black flex flex-col gap-24 items-center'>
			<Header />
			<div className='w-125 rounded-2xl bg-white p-8 shadow-xl h-max'>
				<h1 className='text-3xl font-bold text-center text-gray-700 mb-8'>Your informations</h1>

				<form className='flex flex-col gap-5'>
					<input
						type='password'
						placeholder='Name'
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
					/>

					<input
						type='password'
						placeholder='Last Name'
						className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700'
					/>

					<input
						type='password'
						placeholder='Email'
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