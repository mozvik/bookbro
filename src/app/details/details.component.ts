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
  public stars: string = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public resultsDataService: ResultsDataService) { }

  ngOnInit(): void {
    if (!this.resultsDataService.data) {
      this.router.navigate(['/'])
    }
    this.selectedId = this.route.snapshot.paramMap.get('data.id')
    this.book = this.resultsDataService.getBookById(this.selectedId)
    if (this.book.volumeInfo.averageRating) this.stars = this.generateStarsHTML(this.book.volumeInfo.averageRating)
  }

  private generateStarsHTML(rating: number): string {
    let span = '<span>'
    for (let index = 0; index < Math.floor(rating); index++) {
      span += '<i class="fa fa-star"></i>'
    }
    if (rating % 1 != 0) span += '<i class="fa fa-star-half"></i>'
    return span += '</span>'
  }
}
