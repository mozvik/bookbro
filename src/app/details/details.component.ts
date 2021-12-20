import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsDataService } from 'src/app/service/results-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public selectedId: any
  public book: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public resultsDataService: ResultsDataService,) { }

  ngOnInit(): void {
    if (!this.resultsDataService.data) {
      this.router.navigate(['/'])
    }
    this.selectedId = this.route.snapshot.paramMap.get('data.id');
    this.book = this.resultsDataService.getBookById(this.selectedId)
  }

}
