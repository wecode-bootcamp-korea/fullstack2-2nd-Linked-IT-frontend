const host = process.env.REACT_APP_API_ENDPOINT || 'localhost';
const port = 10000;

const API_ENDPOINT = `http://${host}:${port}`;

export default API_ENDPOINT;
