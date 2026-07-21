import bcrypt from 'bcrypt';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		// Hashowanie hasła
		const hashedPassword = await bcrypt.hash(body.data.attributes.field_password, 10);

		// Podmiana zwykłego hasła na hash
		body.data.attributes.field_password = hashedPassword;

		// Wysłanie danych do Drupala
		const response = await fetch('http://localhost/drupal10/jsonapi/node/nauka_backend', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/vnd.api+json',
				Accept: 'application/vnd.api+json',
			},
			body: JSON.stringify(body),
		});

		const data = await response.json();

		if (!response.ok) {
			return Response.json(data, {
				status: response.status,
			});
		}

		return Response.json(data, {
			status: 201,
		});
	} catch (error) {
		console.error(error);

		return Response.json(
			{
				error: 'Błąd serwera.',
			},
			{
				status: 500,
			},
		);
	}
}
