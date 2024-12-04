function getCookie(key) {
  var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

class AuthenticationAPI {

	static async authenticate() {
		try {
			const response = await fetch('api/auth', {credentials: 'include'});
			if (!response.ok) {
				throw new Error(`Response status: ${response.status}`);
			}

			console.log(response);

			const body = await response.text();

			console.log(body);
			if (body === '')
				return null;

			return await JSON.parse(body);
		} catch (error) {
			console.error(error.message);
		}
	}

	static login() {
		let port = (window.location.port ? ':' + window.location.port : '');
    if (port === ':3000')
      port = ':8080';
    window.location.href = '//' + window.location.hostname + port + '/api/login';
	}

	static async logout() {
		try {
			const response = await fetch(
				'api/logout', {
	      method: 'POST',
	      credentials: 'include',
	      headers: {'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')}
    	});
    	if (!response.ok) {
    		throw new Error(`Response status: ${response.status}`);
    	}

    	const body = await response.json();
    	window.location.href = body.logoutUrl + '?id_token_hint='+ body.idToken
        + '&post_logout_redirect_uri=' + window.location.origin;
		} catch (error) {
			console.error(error.message);
		}
  }

}

export default AuthenticationAPI;