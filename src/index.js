import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import schema from './schema'

const myGraphQLSchema = schema;
const PORT = 3000;

var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.use('/', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(process.env.PORT || PORT);
