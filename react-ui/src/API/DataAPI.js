function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

class DataAPI {

	static request = async (endpoint, method, headers, body) => {
		if (endpoint === "" || endpoint === null)
			return;
		endpoint = `http://localhost:3000/${endpoint}`;
		if (method === "" || method === null)
			method = "GET";
		if (headers === null)
			headers = {};
		if (body === null)
			body = {};
		try {
			const response = await fetch(endpoint, {
				method: method,
				credentials: 'include',
				headers: headers,
				body: body,
			});
			if (!response.ok)
				throw new Error (`Response status: ${response.status}`);

			const data = await response.text();
			if (data !== "")
				return data;
		} catch (err) {
			console.error(err);
			return null;
		}
		return null;
	}

	static requestAsAdmin = async (endpoint, method, headers, body) => {
		headers = {
			...headers,
			'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
		};
		return await this.request(endpoint, method, headers, body);
	}
	
}

export default DataAPI;