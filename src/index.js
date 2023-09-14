if (location.hash) {
  const hash = location.hash
    .substring(1)
    .split('&')
    .reduce((result, item) => {
      const parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

  const ontimeUrl = hash.state;
  const accessToken = hash.access_token;

  const returnUrl = `${ontimeUrl}?accessToken=${accessToken}`;
  location.href = returnUrl;
} else {
  const clientId =
    '428790026655-lb7t3jpqol568748ba8psj7d5r831333.apps.googleusercontent.com';
  const redirectUri =
    location.protocol + '//' + location.host + location.pathname;
  const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

  const loginButton = document.getElementById('login-button');
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  url.searchParams.append('client_id', clientId);
  url.searchParams.append('redirect_uri', redirectUri);
  url.searchParams.append('response_type', 'token');
  url.searchParams.append('scope', scopes.join(' '));
  const ontimeUrl = new URL(location).searchParams.get('ontimeUrl');

  if (!ontimeUrl) {
    const status = document.getElementById('status');
    status.textContent = 'ontimeUrl is required';
  }

  url.searchParams.append('state', ontimeUrl);

  //location.href = url;
}
