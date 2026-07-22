import bcrypt from 'bcrypt';

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json();

		// Pobranie użytkowników z Drupala
		const response = await fetch('http://localhost/drupal10/web/jsonapi/node/klient');

		const data = await response.json();

		// Szukanie użytkownika po emailu
		const user = data.data.find((item: any) => item.attributes.field_email === email);

		if (!user) {
			return Response.json({ error: 'Nie znaleziono użytkownika.' }, { status: 404 });
		}

		// Porównanie hasła z hashem zapisanym w bazie
		const passwordCorrect = await bcrypt.compare(password, user.attributes.field_password);

		if (!passwordCorrect) {
			return Response.json({ error: 'Nieprawidłowe hasło.' }, { status: 401 });
		}

		// Sukces
		return Response.json(
			{
				success: true,
				message: 'Zalogowano pomyślnie!',
				user: {
					id: user.id,
					field_imie: user.attributes.field_imie,
					field_nazwisko: user.attributes.field_nazwisko,
					field_email: user.attributes.field_email,
				},
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
