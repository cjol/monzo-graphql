import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
	name: 'TransactionDeclineReason',
	values: {
		UNDECLINED: {
			value: "UNDECLINED"
		},
		INSUFFICIENT_FUNDS: {
			value: "INSUFFICIENT_FUNDS"
		},
		CARD_INACTIVE: {
			value: "CARD_INACTIVE"
		},
		CARD_BLOCKED: {
			value: "CARD_BLOCKED"
		},
		OTHER: {
			value: "OTHER"
		}
	},
});
