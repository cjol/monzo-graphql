import {GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean} from "graphql";

export default new GraphQLObjectType(
	{
		name: 'AddressType',
		fields: {
			short_formatted: { type: GraphQLString },
			formatted: { type: GraphQLString },
			address: { type: GraphQLString },
			city: { type: GraphQLString },
			region: { type: GraphQLString },
			country: { type: GraphQLString },
			postcode: { type: GraphQLString },
			latitude: { type: GraphQLFloat },
			longitude: { type: GraphQLFloat },
			zoom_level: { type: GraphQLInt },
			approximate: { type: GraphQLBoolean }
		}
	}
);

