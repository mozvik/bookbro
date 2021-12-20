import { Component, OnInit } from '@angular/core';
import { ResultsDataService } from 'src/app/service/results-data.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  constructor(private resultsDataService: ResultsDataService,
  ) { }

  ngOnInit(): void { }

  goHome(): void {
    this.resultsDataService.data = undefined
    this.resultsDataService.currentPage = 0
    this.resultsDataService.queryString = ''
  }
}
