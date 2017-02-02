'use strict';

import path from 'path';

export default {
	// environment
	env: process.env.NODE_ENV || 'development',
	// port on which to listen
	port: process.env.PORT || 5000,
	// path to root directory of this app
	root: path.normalize(__dirname),

	// Monzo details
	"client_secret": "ixiBLRz0MyY1aDmiJ6jI+zhMZ0gyh94Sa0ybB50Ng121dZGM0bHa4BqX78ye46lZ85Fnt8nZSUSqdXhb8Qnr",
	"client_id": "oauthclient_00009FzgfCakeRXVIa9Ndx",
	"owner_id": "user_00009CdMuSVnKdJZbkae01"
};
