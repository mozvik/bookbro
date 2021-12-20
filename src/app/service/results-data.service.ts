import { Injectable } from '@angular/core';
import { Results } from '../classes/results';
import { APIService } from 'src/app/service/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsDataService extends Results {

  constructor(private apiService: APIService,) { super() }

  public getData(queryString: string, page?: number, maxResults?: number): any {
    if (!queryString || queryString.length === 0) return
    if (!page) page = 0
    if (!maxResults) maxResults = 10

    if (page === 0) {//új keresés
      this.queryString = queryString
      this.currentPage = 0
      this.apiService.searchForBooks(queryString).subscribe({
        next: data => this.data = data,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => ''
      })
    }
    else {//load more 
      this.apiService.searchForBooks(queryString,this.currentPage).subscribe({
      next: data => this.data.items.push(...data.items),
      error: err => console.error('Observer got an error: ' + err),
        complete: () => ''
      })
    }
  }

  public getBookById(id: any): any {
    if (this.data) return this.data.items.find((x: any) => x.id === id)
    else return undefined
  }
}
