import type { Stock } from "../entities/stock";

export class StockService {
    async getAll(): Promise<Stock[]>  {
        const response = await fetch('http://localhost:5000/v1/stock');
        const data = await response.json();
        console.log('getAll', data);
        
        return data;
    }
}