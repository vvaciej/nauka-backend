import bcrypt from 'bcrypt';

export async function PATCH(req: Request) {
	try {
		const { email, currentPassword, newPassword } = await req.json();

		console.log('EMAIL:', email);

		// Pobranie użytkowników z Drupala
		const response = await fetch('http://localhost/drupal10/web/jsonapi/node/klient');

		const data = await response.json();

		console.log(data);
		console.log(data.data[0].attributes);

		// Szukanie użytkownika
		const user = data.data.find((item: any) => item.attributes.field_email === email);

    console.log(user);

		if (!user) {
			return Response.json({ error: 'Nie znaleziono użytkownika.' }, { status: 404 });
		}

		// Sprawdzenie aktualnego hasła
		const passwordCorrect = await bcrypt.compare(currentPassword, user.attributes.field_password);

		if (!passwordCorrect) {
			return Response.json({ error: 'Nieprawidłowe aktualne hasło.' }, { status: 401 });
		}

		// Hashowanie nowego hasła
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Aktualizacja w Drupalu
		const updateResponse = await fetch(`http://localhost/drupal10/web/jsonapi/node/klient/${user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/vnd.api+json',
				Accept: 'application/vnd.api+json',
			},
			body: JSON.stringify({
				data: {
					type: 'node--klient',
					id: user.id,
					attributes: {
						field_password: hashedPassword,
					},
				},
			}),
		});
    
    const error = await updateResponse.text();

    console.log(error);

    if (!updateResponse.ok) {
      return Response.json({ error }, { status: updateResponse.status });
    }

		return Response.json(
			{
				success: true,
				message: 'Hasło zostało zmienione.',
			},
			{
				status: 200,
			},
		);
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
