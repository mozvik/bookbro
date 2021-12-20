import { Component, OnInit } from '@angular/core';
import { ResultsDataService } from 'src/app/service/results-data.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  constructor(
    public resultsDataService: ResultsDataService,
  ) {} 
    
  ngOnDestroyed(): void {
    console.log('ResultsComponent Destroyed :>> ');
  }
  ngOnInit(): void { }
  
  loadMore() {
    this.resultsDataService.currentPage++
    this.resultsDataService.getData(this.resultsDataService.queryString,this.resultsDataService.currentPage)
  }
}
  
