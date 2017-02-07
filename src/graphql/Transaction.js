import {GraphQLList, GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLBoolean} from "graphql";
import GraphQLDate from "graphql-date";
import TransactionDeclineReason from "./TransactionDeclineReason";
import Merchant from "./Merchant";
import Category from "./Category";
import Account from "./Account";
import TransactionMetadata from "./TransactionMetadata";
import request from 'request-promise';

export default new GraphQLObjectType(
	{
		name: 'Transaction',
		fields: () => ({
			id: { type: GraphQLID },
			description: { type: GraphQLString },
			amount: { type: GraphQLInt },
			currency: { type: GraphQLString },
			merchant: { type: Merchant },
			notes: { type: GraphQLString },
			account_balance: { type: GraphQLInt },
			category: { type: Category },
			is_load: { type: GraphQLBoolean },
			local_amount: { type: GraphQLInt },
			local_currency: { type: GraphQLString },
			scheme: { type: GraphQLString },
			dedupe_id: { type: GraphQLID },
			originator: { type: GraphQLBoolean },
			include_in_spending: { type: GraphQLBoolean },
			account_id: { type: GraphQLID },
			counterparty: { type: GraphQLString },

			// TODO!
			attachments: { type: new GraphQLList( GraphQLString ) },

			updated: { type: GraphQLDate, resolve: ({updated}) => new Date(updated) },
			settled: { type: GraphQLDate, resolve: ({settled}) => new Date(settled) },
			created: { type: GraphQLDate, resolve: ({created}) => new Date(created) },

			metadatum: { type: GraphQLString,
				args: {
					key: { type: GraphQLString }
				},
				resolve: ( tx, {key}) => tx.metadata[key] || null
			},

			metadata: { type: new GraphQLList( TransactionMetadata ),
				resolve( tx ) {
					const result = [];
					for (const key in tx.metadata) {
						result.push(
							{
								name: key,
								value: tx.metadata[ key ]
							}
						);
					}
					return result;
				}
			},

			account: { type: Account,
				resolve: async ( tx, params, context ) => {

					// annoyingly Monzo have no `account` endpoint so we have to filter down all accounts again
					// could obviously use a cache but I'm trying to be stateless
					const options = {
						method: 'GET',
						auth: {
							bearer: context.token
						},
						uri: 'https://api.monzo.com/accounts',
					};

					const body = JSON.parse(await request(options));
					return body.accounts.find(a => a.id == tx.account_id);
				}
			},

			decline_reason: {
				type: TransactionDeclineReason,
				resolve( obj ) {
					if (obj.decline_reason)
						return obj;
					return "UNDECLINED";
				}
			},

		})
	}
);
