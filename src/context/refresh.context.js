import React, { Component } from 'react';

const initialState = {
	reloadTrigger: false,
	setReloadTrigger: () => {},
	alertOpen: false,
	setAlertOpen: () => {},
};

export const RefreshContext = React.createContext(initialState);
export const RefreshConsumer = RefreshContext.Consumer;

export class RefreshProvider extends Component {
	state = {
		reloadTrigger: false,
		setReloadTrigger: () => {
			this.setState(() => ({
				reloadTrigger: !this.state.reloadTrigger,
			}));
		},
		alertOpen: false,
		setAlertOpen: (newValue) => {
			this.setState(() => ({ alertOpen: newValue }));
		},
	};

	render() {
		return (
			<RefreshContext.Provider value={this.state}>
				{this.props.children}
			</RefreshContext.Provider>
		);
	}
}
