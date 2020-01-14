import axios from 'axios';

const read = () => axios.get('https://7k4d2jbzjg.execute-api.eu-central-1.amazonaws.com/read/read');

const write = data => axios.post('https://7k4d2jbzjg.execute-api.eu-central-1.amazonaws.com/read/save', data);

const update = data => axios.patch('https://7k4d2jbzjg.execute-api.eu-central-1.amazonaws.com/read/put', data);

const findOne = id => axios.get(`https://7k4d2jbzjg.execute-api.eu-central-1.amazonaws.com/read/find-one?id=${id}`);

export { read, write, update, findOne };
