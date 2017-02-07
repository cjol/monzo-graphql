import {GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLBoolean} from "graphql";
import GraphQLDate from "graphql-date";
import TransactionDeclineReasonType from "./TransactionDeclineReasonType";
import MerchantType from "./MerchantType";
import CategoryType from "./CategoryType";
import AccountType from "./AccountType";
import TransactionMetadataType from "./TransactionMetadataType";
import request from 'request-promise';

export default new GraphQLObjectType(
	{
		name: 'TransactionType',
		fields: () => ({
			id: { type: GraphQLString },
			description: { type: GraphQLString },
			amount: { type: GraphQLInt },
			currency: { type: GraphQLString },
			merchant: { type: MerchantType },
			notes: { type: GraphQLString },
			account_balance: { type: GraphQLInt },
			category: { type: CategoryType },
			is_load: { type: GraphQLBoolean },
			local_amount: { type: GraphQLInt },
			local_currency: { type: GraphQLString },
			scheme: { type: GraphQLString },
			dedupe_id: { type: GraphQLString },
			originator: { type: GraphQLBoolean },
			include_in_spending: { type: GraphQLBoolean },
			account_id: { type: GraphQLString },
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

			metadata: { type: new GraphQLList( TransactionMetadataType ),
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

			account: { type: AccountType,
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
				type: TransactionDeclineReasonType,
				resolve( obj ) {
					if (obj.decline_reason)
						return obj;
					return "UNDECLINED";
				}
			},

		})
	}
);
