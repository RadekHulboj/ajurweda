import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs'; 
import { environment } from '../environments/environment'; // Importuj environment

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  
  readonly url = `${environment.apiUrl}/locations`;
  readonly contactUrl = `${environment.apiUrl}/contact`;

  
  constructor(private http: HttpClient) { }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }
  
  submitApplication(firstName: string, lastName: string, email: string, message: string): Observable<string> { 
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}, ${message}.`);
    const payload = { firstName, lastName, email, message };

    // Wysłanie danych do backendu (POST)
    return this.http.post<string>(this.contactUrl, payload);
  }

}

