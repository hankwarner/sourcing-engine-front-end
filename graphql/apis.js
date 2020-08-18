const { RESTDataSource } = require('apollo-datasource-rest');

class FergusonSourcingEngineAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://sourcingenginedashboard.azurewebsites.net/api';
  }

  willSendRequest(request) {
    request.headers.set('Content-Type', 'application/json; charset=utf-8');
    if(this.getOrders){
      request.params.set(
        'code',
        'BHTxCcbTe6lIXW8MVh0Tt3iwNZhEXzyckHRLHN8BSc6Co9qwZ58d8g=='
      );
    } else if(this.checkClaim) {
      request.params.set(
        'code',
        'Szws0XpVR4qyfJs2R2awiIc16bMUsCydnuL7zFUtWqGJW7zr2o/Eqg=='
      );
    } else if(this.claimOrder) {
      request.params.set(
        'code',
        'R/AOz7Pkiw53dJ84G6SFJsIZ3UESLnaB6f4tbwWAjY0hAKMbaMTj3w=='
      );
    } else if(this.releaseOrder) {
      request.params.set(
        'code',
        'HrBgDPSaFKa4FAjJgqdqaC6HunIkkFJgD/FQKocMHiIgvhHhNh8Piw=='
      );
    } else if(this.orderComplete) {
      request.params.set(
        'code',
        'qxWYWsbaMWVFhCaGDUTlaH0Hjwg2fRKkDwTTySVg1SVfjSjbw07gQQ=='
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
