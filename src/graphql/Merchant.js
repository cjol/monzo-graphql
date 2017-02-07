import {GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean} from "graphql";
import GraphQLDate from "graphql-date";
import Address from "./Address";

export default new GraphQLObjectType(
	{
		name: 'Merchant',
		fields: () => ({
			address: { type: Address},
			created: { type: GraphQLDate, resolve: ( { created } ) => new Date( created ) },
			group_id: { type: GraphQLID },
			id: { type: GraphQLID },
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
