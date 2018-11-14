"#osa7" 
Käyttöohjeet:
	frontend => "npm start" ./frontend kansiossa
	backend => "npm run watch" root kansiossa (ei toimi npm startilla samoista syistä kuin osion 5 systeemi)
	.env fileen root-kansioon on piilotettu SECRET ja MONGODB_URL, PORT, TEST_PORT ja TEST_MONGODB_URL
	.env fileen /frontend kansioon on piilotettu SKIP_PREFLIGHT_CHECK=true , sillä joku virhe eslint-dependencyssä estää frontendin käynnistämisen muutoin.
