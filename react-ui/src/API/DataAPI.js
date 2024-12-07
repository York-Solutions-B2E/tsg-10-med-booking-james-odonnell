class DataAPI {

	static get = async(endpoint, headers) => {
		if (endpoint === "" || endpoint == null)
			return;
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
			return data;
		}
		return data;
	}

	static post = async (endpoint, headers, body) => {
		if (endpoint === "" || endpoint == null)
			return;
		try {
			const response = await fetch(endpoint, {
				method: 'POST',
				credentials: 'include',
				headers: headers,
				body: body
			});
			if (!response.ok)
				throw new Error(`Response status: ${response.status}`);

			return await response.text();
		} catch (error) {
			console.error(error);
		}
	}
	
}

export default DataAPI;