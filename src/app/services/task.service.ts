import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Demand } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  static getAllTasks(): any {
    throw new Error('Method not implemented.');
  }

  api = 'http://085c-2001-1388-26a1-a295-464-78ba-b5cc-2096.ngrok.io/api/prestamos'
  apiPerson = 'https://consulta.api-peru.com/api/dni/';

  constructor(private http: HttpClient) { }
  
  getPerson(dni: string) {
    return this.http.get(`${this.apiPerson}${dni}`)
  }

  // getPersonn() {
  //   return this.http.get(`${this.apiPerson}`);
  // }
  
  // getClients() {
  //   return this.http.get(`${this.api}/clients.php`);
  // }

  httpOptions = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
    })
  };

  createDemand(demand: Demand) {
    const path = this.api;
    return this.http.post<Demand>(path, demand);
  }

  sendEmail(demand: Demand){
    const pathEmail = 'https://service-email.herokuapp.com/send';
    return this.http.post<Demand>(pathEmail, demand, this.httpOptions);
  }

}
