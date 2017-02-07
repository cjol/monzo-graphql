import {GraphQLObjectType, GraphQLString, GraphQLBoolean} from "graphql";
import GraphQLDate from "graphql-date";
import AddressType from "./AddressType";

export default new GraphQLObjectType(
	{
		name: 'MerchantType',
		fields: () => ({
			address: { type: AddressType},
			created: { type: GraphQLDate, resolve: ( { created } ) => new Date( created ) },
			group_id: { type: GraphQLString },
			id: { type: GraphQLString },
			logo: { type: GraphQLString },
			emoji: { type: GraphQLString },
			name: { type: GraphQLString },
			category: { type: GraphQLString },
			online: { type: GraphQLBoolean },
			atm: { type: GraphQLBoolean },
			disable_feedback: { type: GraphQLBoolean },
		})
	}
);
