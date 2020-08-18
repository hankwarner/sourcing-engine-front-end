const { RESTDataSource } = require('apollo-datasource-rest');

class FergusonSourcingEngineAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://fergusonsourcingengine.azurewebsites.net/api';
  }

  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json; charset=utf-8');
    if(this.getOrders){
      request.params.set(
        'code',
        'mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw=='
      );
    } else if(this.checkClaim) {
      request.params.set(
        'code',
        'akU/NdJzya8EPdFGYD/NJtJ/VJRYDgGGI/nco5ujNyDdcrCHQAhWWg=='
      );
    } else if(this.claimOrder) {
      request.params.set(
        'code',
        'hmYQxSz505g1dPCNFtaBPhhjeMFQRNxlYAh91owaJGVDcbnpQ4b4hw=='
      );
    } else if(this.releaseOrder) {
      request.params.set(
        'code',
        'O94pZJNzX07aaGJaAfLayaSPl96XF9qRaAajP41Az5wiofHFD4C7zw=='
      );
    } else if(this.orderComplete) {
      request.params.set(
        'code',
        '9cs9ToHl8eWGhKttxxosn0dLLIdqLZofJem1D4RASPW8o/7S9BIkeQ=='
      );
    }
  }

  async getOrders() {
    return this.get(`${this.baseURL}/manual-orders`);
  }

  async checkClaim(id) {
    return this.post(`${this.baseURL}/order/is-claimed/${id}`)
  }

  async claimOrder(id) {
    return this.post(`${this.baseURL}/order/claim/${id}`);
  }

  async releaseOrder(id) {
    return this.post(`${this.baseURL}/order/release/${id}`);
  }

  async orderComplete(id) {
    return this.post(`${this.baseURL}/order/complete/${id}`);
  }
}

module.exports = {
  FergusonSourcingEngineAPI,
};
