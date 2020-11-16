const { RESTDataSource } = require('apollo-datasource-rest');
const inTest = process.env.WEBSITE_HOSTNAME.includes('test');
const inDev = process.env.NODE_ENV === 'development';

class FergusonSourcingEngineAPI extends RESTDataSource {
	constructor() {
		super();
		if (inTest | inDev) {
			this.baseURL =
				'https://sourcingdashboard-dev.azurewebsites.net/api/';
			this.authCode =
				'hv2ajpauLkVEDDcgbnkmPTW5ryHqHnXBftIRm3CKioByFSutRafB0w==';
		} else {
			this.baseURL =
				'https://sourcingenginedashboard.azurewebsites.net/api';
			this.authCode =
				'4a9/Fq8Komxwk5/3x/XwkvdhQpXlWg37IUn9vF6tD3apaxWGOU91qg==';
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
