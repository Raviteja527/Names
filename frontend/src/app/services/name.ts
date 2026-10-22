import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  private apiUrl = 'http://localhost:3000/api/names';

  constructor(private http: HttpClient) { }

  addName(name: string) {
    return this.http.post(this.apiUrl, {
      name: name
    });
  }

  getNames() {
    return this.http.get(this.apiUrl);
  }

  updateName(id: number, name: string) {
    return this.http.put(`${this.apiUrl}/${id}`, {
      name: name
    });
  }
  deleteName(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
