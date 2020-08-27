import React, { Component } from 'react';

const initialState = {
  currentClaimedOrder: '',
  setCurrentClaimedOrder: () => {},
  orderAlertOpen: false,
  setOrderAlertOpen: () => {},
};

export const OrderContext = React.createContext(initialState);
export const OrderConsumer = OrderContext.Consumer;

export class OrderProvider extends Component {
  state = {
    currentClaimedOrder: '',
    setCurrentClaimedOrder: (order) => {
      this.setState(() => ({ currentClaimedOrder: order }));
    },
    orderAlertOpen: false,
    setOrderAlertOpen: (newValue) => {
      this.setState(() => ({ orderAlertOpen: newValue }));
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
