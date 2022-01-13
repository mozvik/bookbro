import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  serverUrl: string = 'https://www.googleapis.com/books/v1';
  apiKey: string = '';
  observables: any = {}

  constructor(
    private http: HttpClient,
    ) { }

  isValidISBN10(isbn: string): boolean {
    if (isbn.length != 10) return false;//nem 10 karakter hosszú-> notValid

    let lastDigit = isbn[9] //az utolsó számjegy, ami lehet időnként X
    let sum = 0

    for (let i = 0; i < isbn.length - 1; i++) //1.-9. számjegy 
    { 
      if (isNaN(parseInt(isbn[i], 10))) return false; //a számjegy nem szám -> notValid
      sum += parseInt(isbn[i]) * (10 - i)
    }
    lastDigit === 'x' || lastDigit === 'X' ? sum += 1 * 10: sum += 1 * parseInt(lastDigit) // X az utolsó szám?

    if (sum%11 === 0) return true //11-el osztva az összeget nincs maradék tehát VALID

    return false
  }

  isValidISBN13(isbn: string): boolean {
    if (isbn.length != 13) return false;//nem 13 karakter hosszú-> notValid
    let lastDigit = isbn[12] //az utolsó számjegy, ami lehet időnként X
    let sum = 0
    let multiplier
    let remainder
    
    for (let i = 0; i < isbn.length - 1; i++) //1.-12. számjegy 
    { 
      if (isNaN(parseInt(isbn[i], 10))) return false; //a számjegy nem szám -> notValid
      if((i+1)%2 !== 0) multiplier = 1 //ha páratlan számnál járunk, a szorzó 1
      else multiplier = 3 //ha páros, akkor a szorzó 3
      sum += parseInt(isbn[i]) * multiplier
    }
    
    remainder = sum % 10 //osztva tízzel megvizsgáljuk a maradékot

    if(10 - remainder == parseInt(lastDigit)) return true //ha 10ből kivonva a maradékot megkapjuk az utolsó 13. számjegyet akkor -> VALID
    return false
  }
  
  searchForBooks(query: string, page: number = 0): Observable<any> {
    let url
    if (this.isValidISBN10(query) || this.isValidISBN13(query)) {
      url = `${this.serverUrl}/volumes?q=isbn:${query}&startIndex=${page * 10}&maxResults=10&?key=${this.apiKey}`
    }
    else {
      url = `${this.serverUrl}/volumes?q=${query}+intitle:${query}&startIndex=${page * 10}&maxResults=10&?key=${this.apiKey}`
    }
    return this.http.get<any[]>(url)
      .pipe(
      catchError(this.handleError<any[]>('searchForBooks', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  log(arg0: string) {
    throw new Error('Method not implemented.');
  }

}