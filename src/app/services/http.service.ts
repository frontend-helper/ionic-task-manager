import { Injectable } from '@angular/core';
import { Http } from '@capacitor-community/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  async doGet(url: string) {
    const options = {
      url: url,
    };
  
    const response = await Http.get(options);
    return response.data;
  }

  async doDelete(url: string) {
    const options = {
      url: url,
    };
  
    const response = await Http.del(options);
    return response.data;
  }


  async doPost(url: string, data: any) {
    const options = {
      url: url,
      data: data
    };
  
    const response = await Http.post(options);
    return response.data;
  }
}
