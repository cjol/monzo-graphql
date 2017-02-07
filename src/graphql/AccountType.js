import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } from 'graphql';
import GraphQLDate from 'graphql-date';
import BalanceType from './BalanceType';
import TransactionType from './TransactionType';
import request from 'request-promise';

export default new GraphQLObjectType({
	name: 'AccountType',
	fields: () => (
		{
		id: {type: GraphQLString},
		description: {	type: GraphQLString },
		created: { type: GraphQLDate,
			resolve: (account) => {
				return new Date(account.created)
			}
		},

		balance: { type: BalanceType,
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

		transactions: { type: new GraphQLList(TransactionType),
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
