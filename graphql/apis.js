const { RESTDataSource } = require('apollo-datasource-rest');

class FergusonSourcingEngineAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://fergusonsourcingengine.azurewebsites.net/api';
  }

  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json; charset=utf-8');
    request.params.set(
      'code',
      'mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw=='
    );
  }

  async getOrders() {
    return this.get(`${this.baseURL}/manual-orders`);
  }

  // code = 'mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw=='

  // async checkClaim(id) {
  //   return this.post(`${this.baseURL}/order/is-claimed/${id}`)
  // }

  // code = 'akU/NdJzya8EPdFGYD/NJtJ/VJRYDgGGI/nco5ujNyDdcrCHQAhWWg=='

  // async claimOrder(id) {
  //   return this.post(`${this.baseURL}/order/claim/${id}`);
  // }

  // code = 'hmYQxSz505g1dPCNFtaBPhhjeMFQRNxlYAh91owaJGVDcbnpQ4b4hw=='

  // async releaseOrder(id) {
  //   return this.post(`${this.baseURL}/order/release/${id}`);
  // }

  // code = 'O94pZJNzX07aaGJaAfLayaSPl96XF9qRaAajP41Az5wiofHFD4C7zw=='

  // async orderComplete(id) {
  //   return this.post(`${this.baseURL}/order/complete/${id}`);
  // }

  // code = '9cs9ToHl8eWGhKttxxosn0dLLIdqLZofJem1D4RASPW8o/7S9BIkeQ=='
}

module.exports = {
  FergusonSourcingEngineAPI,
};
