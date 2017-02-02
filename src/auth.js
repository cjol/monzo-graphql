'use strict';

import request from 'request-promise';

import config from './config';

const client_id = config.client_id;
const redirect_uri = "http://localhost:5000/callback";
const state_token = "ABCD1234";

export default async function(req, res, next) {

	if (req.cookies && req.cookies.monzoToken) {

		// this is all clear
		return next()

	} else if (req.path === "/callback" && req.query.state && req.query.code) {


		// this is after the OAuth redirect - extract the token
		const token = await getTokenFromCode(req.query)

		res.cookie('monzoToken', token.access_token);

		return res.redirect(`/`);

	} else {

		// this is totally unauthenticated - init step 1 of OAuth
		return res.redirect(`https://auth.getmondo.co.uk/?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state_token}`);

	}
}

async function getTokenFromCode({state, code}) {
	if (state === "ABCD1234") {
		var options = {
			method: 'POST',
			uri: 'https://api.monzo.com/oauth2/token',
			form: {
				grant_type: "authorization_code",
				client_id: config.client_id,
				client_secret: config.client_secret,
				code,
				redirect_uri: redirect_uri,
			},
		};

		const body = await request(options);
		return JSON.parse(body);
	} else {
		throw new Error("Authentication error");
	}
}

async function refreshToken(refresh_token) {
	var options = {
		method: 'POST',
		uri: 'https://api.monzo.com/oauth2/token',
		form: {
			grant_type: "refresh_token",
			client_id: config.client_id,
			client_secret: config.client_secret,
			refresh_token
		}
	};

	console.log("Got a new one!");
	console.log(body)
	const body = await request(options);
	return JSON.parse(body);
}

async function callbackHandler(req, res) {
	try {
		const token1 = await getTokenFromCode(req.query);
		// const token1 = {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5RnpnZkNha2VSWFZJYTlOZHgiLCJleHAiOjE0ODU1NzU1MjIsImlhdCI6MTQ4NTU1MzkyMiwianRpIjoidG9rXzAwMDA5R3BiNXFNZ3R5SW9nb3ZpQkYiLCJ1aSI6InVzZXJfMDAwMDlDZE11U1ZuS2RKWmJrYWUwMSIsInYiOiIyIn0.VgE7FWDDTfHNsP5ixco6hE7AKmOu7tkpa6_X5cqG-0s","client_id":"oauthclient_00009FzgfCakeRXVIa9Ndx","expires_in":21599,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaSI6InRva18wMDAwOUdwYjVxTWd0eUlvZ292aUJGIiwiY2kiOiJvYXV0aGNsaWVudF8wMDAwOUZ6Z2ZDYWtlUlhWSWE5TmR4IiwiaWF0IjoxNDg1NTUzOTIyLCJ1aSI6InVzZXJfMDAwMDlDZE11U1ZuS2RKWmJrYWUwMSIsInYiOiIyIn0.TRhRfKnabkBqExxpvdOPaaAagAtyqv4IGryZwYXzFxQ","token_type":"Bearer","user_id":"user_00009CdMuSVnKdJZbkae01"};
		// const token2= {};

		const token2 = await refreshToken(token1.refresh_token);

		// const token1 = {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5RnpnZkNha2VSWFZJYTlOZHgiLCJleHAiOjE0ODU1NzU2NzcsImlhdCI6MTQ4NTU1NDA3NywianRpIjoidG9rXzAwMDA5R3BiS0FVQXRINDFBNFZodzEiLCJ1aSI6InVzZXJfMDAwMDlDZE11U1ZuS2RKWmJrYWUwMSIsInYiOiIyIn0.Mg0KlFljJAgo0qzLVr3y_zUoRhkpesD59WekGA3qjSc","client_id":"oauthclient_00009FzgfCakeRXVIa9Ndx","expires_in":21599,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaSI6InRva18wMDAwOUdwYktBVUF0SDQxQTRWaHcxIiwiY2kiOiJvYXV0aGNsaWVudF8wMDAwOUZ6Z2ZDYWtlUlhWSWE5TmR4IiwiaWF0IjoxNDg1NTU0MDc3LCJ1aSI6InVzZXJfMDAwMDlDZE11U1ZuS2RKWmJrYWUwMSIsInYiOiIyIn0.C_Ni_aVX54x3ehL4jY8lmNMzdYAhSOS9maePbZwa2i4","token_type":"Bearer","user_id":"user_00009CdMuSVnKdJZbkae01"};
		// const token2 = {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaSI6Im9hdXRoY2xpZW50XzAwMDA5RnpnZkNha2VSWFZJYTlOZHgiLCJleHAiOjE0ODU1NzU2NzcsImlhdCI6MTQ4NTU1NDA3NywianRpIjoidG9rXzAwMDA5R3BiS0NYbkVuRjlrdm9CcXoiLCJ1aSI6InVzZXJfMDAwMDlDZE11U1ZuS2RKWmJrYWUwMSIsInYiOiIyIn0.1jvzgjJB2T8DR4iIaNQwOhSN6Rd_8OirI-_dgBdZoco","client_id":"oauthclient_00009FzgfCakeRXVIa9Ndx","expires_in":21599,"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhaSI6InRva18wMDAwOUdwYktDWG5FbkY5a3ZvQnF6IiwiY2kiOiJvYXV0aGNsaWVudF8wMDAwOUZ6Z2ZDYWtlUlhWSWE5TmR4IiwiaWF0IjoxNDg1NTU0MDc3LCJ1aSI6InVzZXJfMDAwMDlDZE11U1ZuS2RKWmJrYWUwMSIsInYiOiIyIn0.WNkdMjPxLelIO5DS-Qzus4OGUlkwOYLAiTWBDQgf22k","token_type":"Bearer","user_id":"user_00009CdMuSVnKdJZbkae01"};

		res.render('auth', {
			message: `const token1 = ${JSON.stringify(token1)};
			const token2= ${JSON.stringify(token2)};`,
			base: false
		});
	} catch (e) {
		res.render('auth', {
			message: `Error: ${e}`,
			base: false
		});
	}
}
