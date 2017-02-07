import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import GraphQLDate from 'graphql-date';
import Balance from './Balance';
import Transaction from './Transaction';
import request from 'request-promise';

export default new GraphQLObjectType({
	name: 'AccountType',
	fields: () => (
		{
		id: {type: GraphQLID},
		description: {	type: GraphQLString },
		created: { type: GraphQLDate,
			resolve: (account) => {
				return new Date(account.created)
			}
		},

		balance: { type: Balance,
			async resolve(account, params, context) {
				const options = {
					method: 'GET',
					auth: {
						bearer: context.token
					},
					qs: {
						account_id: account.id
					},
					uri: 'https://api.monzo.com/balance',
				};

				return JSON.parse(await request(options));
			}
		},

		transactions: { type: new GraphQLList(Transaction),
			args: {
				limit: {
					type: GraphQLInt
				}
			},
			async resolve( account, params, context ) {

				const options = {
					method: 'GET',
					auth: {
						bearer: context.token
					},
					qs: {
						account_id: account.id,
						"expand[]": "merchant"
					},
					uri: 'https://api.monzo.com/transactions',
				};

				if (params.limit) {
					options.qs.limit = params.limit;
				}

				const body = JSON.parse(await request(options));
				return body.transactions;
			}
		}
	})
});
