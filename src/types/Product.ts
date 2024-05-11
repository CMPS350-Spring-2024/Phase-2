export interface ProductCreate {
	/**
	 * The product's name, for example "Mavic 3 Pro"
	 */
	name: string;

	/**
	 * A short description of the product
	 */
	description: string;

	/**
	 * The product's price
	 */
	price: number;

	/**
	 * The number of units available in stock
	 */
	quantity: number;

	/**
	 * The weight of the product in grams
	 */
	weight: number;

	/**
	 * Maximum flight time in minutes
	 */
	flightTime: number;

	/**
	 * The overall rating of the product, out of 5
	 */
	rating: number;

	/**
	 * The number of reviews
	 */
	numberOfReviews: number;

	/**
	 * The number of sales
	 */
	numberOfSales: number;

	/**
	 * The number of ongoing orders
	 */
	numberOfOngoingOrders: number;

	/**
	 * The image URL of the product
	 */
	imageUrl: string;

	/**
	 * The 3D model to display for the product
	 */
	model: {
		/**
		 * The URL of the model
		 */
		url: string;

		/**
		 * The position of the model in the scene
		 */
		position: {
			x: number;
			y: number;
			z: number;
		};

		/**
		 * The rotation of the model in degrees
		 */
		rotation: {
			x: number;
			y: number;
			z: number;
		};

		/**
		 * The scale to display the model at
		 */
		scale: number;

		/**
		 * The initial position of the camera
		 */
		cameraPosition: {
			x: number;
			y: number;
			z: number;
		};
	};

	/**
	 * Data on the series of the drone, for example "Mavic" or "Phantom"
	 */
	series: {
		/**
		 * The series' name, for example "Mavic"
		 */
		name: string;

		/**
		 * The model number of the series, for example "3 Pro"
		 */
		model: string;

		/**
		 * A one or two word description of the series, for example "Aerial Photography"
		 */
		description: string;
	};

	/**
	 * The different features of the product
	 */
	features: Array<{
		/**
		 * A short description of the feature
		 */
		name: string;

		/**
		 * The image URL of the feature
		 */
		imageUrl: string;
	}>;

	/**
	 * A list of items that come with the product, for example "Drone, Remote Controller, Battery"
	 */
	includedItems: Array<{
		/**
		 * The name of the item
		 */
		name: string;

		/**
		 * The quantity of the item
		 */
		quantity: number;

		/**
		 * The image URL of the item
		 */
		imageUrl: string;
	}>;

	/**
	 * A list of frequently asked questions about the product
	 */
	faqs: Array<{
		/**
		 * The question
		 */
		question: string;

		/**
		 * The answer
		 */
		answer: string;
	}>;
}
