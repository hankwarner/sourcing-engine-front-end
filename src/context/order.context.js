import React, { Component } from 'react';

const initialState = {
	currentClaimedOrder: '',
	setCurrentClaimedOrder: () => {},
};

export const OrderContext = React.createContext(initialState);
export const OrderConsumer = OrderContext.Consumer;

export class OrderProvider extends Component {
	state = {
		currentClaimedOrder: '',
		setCurrentClaimedOrder: (order) => {
			this.setState(() => ({ currentClaimedOrder: order }));
		},
	};

	render() {
		return (
			<OrderContext.Provider value={this.state}>
				{this.props.children}
			</OrderContext.Provider>
		);
	}
}
