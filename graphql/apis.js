const { RESTDataSource } = require('apollo-datasource-rest');
const isProd =
	process.env.WEBSITE_HOSTNAME &&
	!process.env.WEBSITE_HOSTNAME.includes('test');

class FergusonSourcingEngineAPI extends RESTDataSource {
	constructor() {
		super();
		if (isProd) {
			this.baseURL = process.env.API_URL_PROD;
			this.authCode = process.env.API_KEY_PROD;
		} else {
			this.baseURL = process.env.API_URL_DEV;
			this.authCode = process.env.API_KEY_DEV;
		}
	}

	willSendRequest(request) {
		request.headers.set('Content-Type', 'application/json; charset=utf-8');
		request.params.set('code', this.authCode);
	}

	async getOrders() {
		return this.get(`${this.baseURL}/manual-orders`);
	}

	async checkClaim(id) {
		return await this.get(
			`${this.baseURL}/order/is-claimed/${encodeURI(id)}`
		).then((data) => (data ? { claimed: true } : { claimed: false }));
	}

	async claimOrder(id) {
		return await this.post(
			`${this.baseURL}/order/claim/${encodeURI(id)}`
		).then(() => true);
	}

	async releaseOrder(id) {
		return this.post(`${this.baseURL}/order/release/${encodeURI(id)}`).then(
			() => true
		);
	}

	async completeOrder(id) {
		return this.post(
			`${this.baseURL}/order/complete/${encodeURI(id)}`
		).then(() => true);
	}

	async unCompleteOrder(id) {
		return this.post(
			`${this.baseURL}/order/uncomplete/${encodeURI(id)}`
		).then(() => true);
	}

	async saveOrderNote(id, note) {
		return this.put(
			`${this.baseURL}/order/${encodeURI(id)}/note
			`,
			{ note }
		).then(() => true);
	}
}

module.exports = {
	FergusonSourcingEngineAPI,
};
