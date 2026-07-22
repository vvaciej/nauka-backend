import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
	try {
		const { id, firstName, lastName, email } = await req.json();

		const response = await fetch(`http://localhost/drupal10/web/jsonapi/node/klient/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/vnd.api+json',
				Accept: 'application/vnd.api+json',
			},
			body: JSON.stringify({
				data: {
					type: 'node--klient',
					id,
					attributes: {
						title: `${firstName} ${lastName}`,
						field_imie: firstName,
						field_nazwisko: lastName,
						field_email: email,
					},
				},
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(data, {
				status: response.status,
			});
		}

		return NextResponse.json(
			{
				success: true,
				message: 'Dane zostały zaktualizowane.',
				data,
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.error(error);

		return NextResponse.json(
			{
				error: 'Błąd serwera.',
			},
			{
				status: 500,
			},
		);
	}
}
