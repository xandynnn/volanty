import axios from 'axios';

const api = axios.create({
	//baseURL: 'http://fipeapi.appspot.com/api/1'
	baseURL: 'https://api.fipeapi.com.br/v1'
});

const key = '?9c86d2c2155102bfffbab7d069036e11';

//	Get
export const getMarcas = () => api.get(`/carros${key}`);
export const getVeiculos = (marca) => api.get(`/carros/${marca}${key}`);
export const getModelos = (marca, modelo) => api.get(`/carros/${marca}/${modelo}${key}`);
export const getVeiculo = (marca, modelo, ano) => api.get(`/carros/${marca}/${modelo}/${ano}${key}`)

//	API ESTAVA INDISPONÍVEL
// export const getMarcas = () => api.get('/carros/marcas.json');
// export const getVeiculos = (marca) => api.get(`/carros/veiculos/${marca}.json`);
// export const getModelos = (marca, modelo) => api.get(`/carros/veiculo/${marca}/${modelo}.json`);
// export const getVeiculo = (marca, modelo, ano) => api.get(`/carros/veiculo/${marca}/${modelo}/${ano}.json`)

const apis = {
	getMarcas,
	getVeiculos,
	getModelos,
	getVeiculo
}

export default apis;
