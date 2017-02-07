import { GraphQLEnumType } from 'graphql';

export default new GraphQLEnumType({
	name: 'CategoryType',
	values: {
		mondo: {
			value: "mondo"
		},
		general: {
			value: "general"
		},
		eating_out: {
			value: "eating_out"
		},
		expenses: {
			value: "expenses"
		},
		transport: {
			value: "transport"
		},
		cash: {
			value: "cash"
		},
		bills: {
			value: "bills"
		},
		entertainment: {
			value: "entertainment"
		},
		shopping: {
			value: "shopping"
		},
		holidays: {
			value: "holidays"
		},
		groceries: {
			value: "groceries"
		}
	},
});
