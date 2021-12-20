import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResultsDataService } from 'src/app/service/results-data.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
  
export class SearchFieldComponent implements OnInit {
  @Input() placeholder: string = "Search..."
  value: any = ""

  constructor(
    private router: Router,
    private resultsDataService: ResultsDataService,    
  ) {
    this.value = resultsDataService.queryString
  }

  ngOnInit(): void {}
  
  onClick(event: Event): void {
    if (this.value != "") {
      event.preventDefault()
      this.resultsDataService.getData(this.value)
      this.router.navigate(['results']) 
    }
  }
}
