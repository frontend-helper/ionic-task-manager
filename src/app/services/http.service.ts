import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  async doGet(url: string) {
    const options = {
      url: url,
    };
  
    const response = await CapacitorHttp.get(options);
    return response.data;
  }

  async doDelete(url: string) {
    const options = {
      url: url,
    };
  
    const response = await CapacitorHttp.delete(options);
    return response.data;
  }


  async doPost(url: string, data: any) {
    const options = {
      url: url,
      data: data,
      headers: { 'Content-Type': 'application/json' },
    };
  
    const response = await CapacitorHttp.post(options);
    return response.data;
  }
}
