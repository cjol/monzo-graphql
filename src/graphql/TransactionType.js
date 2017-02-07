import {GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLBoolean} from "graphql";
import GraphQLDate from "graphql-date";
import TransactionDeclineReasonType from "./TransactionDeclineReasonType";
import MerchantType from "./MerchantType";
import CategoryType from "./CategoryType";
import AccountType from "./AccountType";
import TransactionMetadataType from "./TransactionMetadataType";
import request from "request-promise";

export default new GraphQLObjectType(
	{
		name: 'TransactionType',
		fields: () => ({
			id: {
				type: GraphQLString
			},
			created: {
				type: GraphQLDate,
				resolve: ( account ) => {
					return new Date( account.created )
				}
			},
			description: {
				type: GraphQLString
			},
			amount: {
				type: GraphQLInt
			},
			currency: {
				type: GraphQLString
			},
			merchant: {
				type: MerchantType,
				resolve (tx){
					console.log(tx.merchant)
				}
			},
			notes: {
				type: GraphQLString
			}
			,
			metadatum: {
				type: GraphQLString,
				args: {
					key: {
						type: GraphQLString
					}
				}
				,
				resolve( tx, { key } )
				{
					return tx.metadata[ key ] || null;
				}
			}
			,
			metadata: {
				type: new GraphQLList( TransactionMetadataType ),
				resolve( tx )
				{
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
			}
			,
			account_balance: {
				type: GraphQLInt
			}
			,
			attachments: {
				// TODO!
				type: new GraphQLList( GraphQLString )
			}
			,
			category: {
				type: CategoryType
			}
			,
			is_load: {
				type: GraphQLBoolean
			}
			,
			settled: {
				type: GraphQLDate,
				resolve: ( tx ) => {
					return new Date( tx.created )
				}
			}
			,
			local_amount: {
				type: GraphQLInt
			}
			,
			local_currency: {
				type: GraphQLString
			}
			,
			updated: {
				type: GraphQLDate,
				resolve: ( tx ) => {
					return new Date( tx.created )
				}
			}
			,
			account_id: {
				type: GraphQLString
			}
			,
			account: {
				type: AccountType,
				resolve: async( tx, params, context ) => {

					// annoyingly Monzo have no `account` endpoint so we have to filter down all accounts again
					// could obviously use a cache but I'm trying to be stateless
					var options = {
						method: 'GET',
						auth: {
							bearer: context.token
						},
						uri: 'https://api.monzo.com/accounts',
					};

					const body = JSON.parse( await request( options ) );
					return body.accounts.find( a => a.id == tx.account_id );
				}
			}
			,
			counterparty: {
				type: GraphQLString,
				resolve: ( tx ) => {
					return null;
				}
			}
			,
			scheme: {
				type: GraphQLString
			}
			,
			dedupe_id: {
				type: GraphQLString
			}
			,
			originator: {
				type: GraphQLBoolean
			}
			,
			include_in_spending: {
				type: GraphQLBoolean
			}
			,
			decline_reason: {
				type: TransactionDeclineReasonType,
				resolve( obj )
				{
					if (obj.decline_reason)
						return obj;
					return "UNDECLINED";
				}
			}
			,

		})
	}
)
;
