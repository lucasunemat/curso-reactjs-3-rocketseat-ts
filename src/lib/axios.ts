import axios from 'axios';

export const api = axios.create({
    //todas req pelo axios serão enviadas pra cá 
    // assim, na fetchTransacionts() você só precisa usar:
    // const url = new URL('/transactions')
    baseURL: 'http://localhost:3000' 
})