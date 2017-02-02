import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress, } from 'graphql-server-express';
import schema from './schema';
import auth from './auth';
import cookieParser from 'cookie-parser';

const myGraphQLSchema = schema;
const PORT = 5000;

var app = express( );

app.use(cookieParser( ));

app.use('/graphql', bodyParser.json( ), graphqlExpress(req => ({
	schema: myGraphQLSchema,
	context: {
		token: req.cookies.monzoToken
	},
})));

app.use('/', auth, graphiqlExpress({ endpointURL: '/graphql' }));

app.listen( process.env.PORT || PORT );
console.log( `Listening on ${ process.env.PORT || PORT }` )
