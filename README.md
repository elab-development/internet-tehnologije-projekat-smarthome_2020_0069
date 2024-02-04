# Smart Home platforma
Platforma za upravljanje pametnim uređajima u domu. Omogućava korisnicima da centralizovano kontrolišu svetla, zvučnike, kamere, termostate i prečišćivače vazduha pomoću Web aplikacije. 

## Tehnologije i pokretanje aplikacije
Backend aplikacije pisan je u Phoenix okviru programskog jezika Elixir, a kao subp je korišćen PostgreSQL. Frontend je pisan u React-u.

Za pokretanje backend-a, potrebno je da prethodno budu instalirani Elixir i Erlang kompajeri, kao i Mix build alat. Više informacija na sledećem linku: https://elixir-lang.org/install.html </br>
- Nakon instalacije i kloniranja projekta, u okviru smart_home_backend direktorijuma nalazi se backend aplikacije
- Prvo je potrebno pokrenuti naredbu ```mix deps.get``` kako bi se instalirali neophodni paketi
- Nakon toga pokretanjem naredbe ```mix ecto.migrate``` pokreću se odgovarajuće migracije za bazu podataka
- Pokretanje servera vrši se naredbom ```mix phx.server```

Za pokretanje frontend-a, potrebno je da bude instaliran Node.js i npm sistem za upravljanje paketima. Više informacija na sledećem linku: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs
- Nakon instalacije i kloniranja projekta, u okviru smart_home_frontend nalazi se frontend aplikacije
- Prvo je potrebno pokrenuti naredbu ```npm install``` kako bi se instalirali neophodni paketi
- Pokretanje aplikacije vrši se naredbom ```npm start```

## Izgled aplikacije

|    |    |
|:-------:|:-------:|
|<img src="/images/signin.png" width="500">|<img src="/images/signup.png" width="500">|
|**Sign in**|**Sign up**|
|    |    |
|<img src="/images/thermostats.png" width="500">|<img src="/images/speakers.png" width="500">|
|**Thermostats**|**Speakers**|
|    |    |
|<img src="/images/lights.png" width="500">|<img src="/images/cameras.png" width="500">|
|**Lights**|**Cameras**|
|<img src="/images/purifiers.png" width="500">|<img src="/images/profile.png" width="500">|
|**Purifiers**|**Profile**|
