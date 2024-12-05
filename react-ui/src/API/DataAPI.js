class DataAPI {

	static async get(endpoint, headers) {
		let data = null;
		try {
			const response = await fetch(endpoint, {
				credentials: 'include',
				headers: headers
			});
			console.log(response);
			if (!response.ok)
				throw new Error(`Response status: ${response.status}`);

			const body = await response.text();
			data = await JSON.parse(body);
			console.log(data);
		} catch (error){
			console.error(error);
		}
		return data;
	}
	
}

export default DataAPI;