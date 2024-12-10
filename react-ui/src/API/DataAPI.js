function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

class DataAPI {

	static get = async(endpoint, headers) => {
		if (endpoint === "" || endpoint == null)
			return;
		let data = null;
		endpoint = `http://localhost:3000/${endpoint}`;
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
		endpoint = `http://localhost:3000/${endpoint}`;
		headers = {...headers, 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')};
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
			return "";
		}
	}

	static put = async (endpoint, headers, body) => {
		if (endpoint === "" || endpoint === null)
			return null;
		endpoint = `http://localhost:3000/${endpoint}`;
		headers = {...headers, 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')};
		try {
			const response = await fetch(endpoint, {
				method: 'PUT',
				credentials: 'include',
				headers: headers,
				body: body
			});
			if (!response.ok)
				throw new Error(`Response status: ${response.status}`);

			return await response.text();
		} catch (error) {
			console.error(error);
			return "";
		}
	}

	static delete = async (endpoint, headers, body) => {
		if (endpoint === "" || endpoint === null)
			return null;
		endpoint = `http://localhost:3000/${endpoint}`;
		headers = {...headers, 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')};
		try {
			const response = await fetch(endpoint, {
				method: 'DELETE',
				credentials: 'include',
				headers: headers,
				body: body
			});
			if (!response.ok)
				throw new Error(`Response status: ${response.status}`);

			return await response.text();
		} catch (error) {
			console.error(error);
			return "";
		}
	}
	
}

export default DataAPI;