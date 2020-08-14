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

  async orderComplete(id) {
    return this.post(`${this.baseURL}/order/complete/${id}`);
  }
}

module.exports = {
  FergusonSourcingEngineAPI,
};
