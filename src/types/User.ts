export interface UserCreate {
	/**
	 * The user's name as an object containing the first and last name
	 */
	name: {
		/**
		 * The user's first name, if the user is an admin, this will be "Admin"
		 */
		first: string;

		/**
		 * The user's last name, empty if the user is an admin
		 */
		last?: string;
	};

	/**
	 * The user's email address
	 */
	email: string;

	/**
	 * The user's phone number with Qatar's country code and in the format +974-XXXX-XXXX
	 */
	phone: string;

	/**
	 * The user's password
	 */
	password: string;

	/**
	 * The color to use for the avatar
	 */
	avatarColor:
		| 'black'
		| 'red'
		| 'orange'
		| 'amber'
		| 'yellow'
		| 'lime'
		| 'green'
		| 'emerald'
		| 'teal'
		| 'cyan'
		| 'sky'
		| 'blue'
		| 'indigo'
		| 'violet'
		| 'purple'
		| 'fuchsia'
		| 'pink'
		| 'rose';

	/**
	 * Amount of money the user has
	 */
	balance: number;

	/**
	 * Data for the customer's shipping address, this is optional by default
	 */
	shippingAddress?: {
		/**
		 * A label for the address
		 */
		label: string;

		/**
		 * The street address
		 */
		street: string;

		/**
		 * The city to ship to
		 */
		city: string;

		/**
		 * The country to ship to
		 */
		country: string;

		/**
		 * The google maps link to the address
		 */
		url: string;
	};
}
