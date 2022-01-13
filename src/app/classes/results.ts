import { Directive } from "@angular/core";


@Directive()
export class Results {
  public data: any
  public currentPage: number = 0
  public queryString: string = ''
  private noThumbnail: string = 'assets/book.svg'

  constructor() { }
  
  private getBook(bookId: number) {
    return this.data.items.find((item: any) => item.id === bookId)
  }

  getMaxPage(): number {
    return Math.ceil(this.data.totalItems / 10)
  }

  getThumbnailUrl(bookId: number): string {
    let book: any = this.getBook(bookId)
    
    if (book && book.volumeInfo.imageLinks) {
      if (book.volumeInfo.imageLinks.thumbnail) {
        return book.volumeInfo.imageLinks.thumbnail
      }
      else if (book.volumeInfo.imageLinks.smallThumbnail) {
        return book.volumeInfo.imageLinks.smallThumbnail
      }
      else {
        return this.noThumbnail
      }
    } else {
      return this.noThumbnail
    }
  }
  
  getAuthors(bookId: number): string {
    let authors = ''
    let book: any = this.getBook(bookId)
    if (book && book.volumeInfo.authors) {
      for (const author of book.volumeInfo.authors) {
        authors += author + ', '
      }
      authors = authors.slice(0, authors.length - 2)
      return authors
    }
    else return authors
  }
  
  getISBN(bookId: number): string[] {
    let book: any = this.getBook(bookId)
    let isbnArray: string[] = []
    if (book && book.volumeInfo.industryIdentifiers) {
      for (const isbn of book.volumeInfo.industryIdentifiers) {
        if (isbn.type === 'ISBN_10') {
          isbnArray.push(`ISBN10: ${isbn.identifier}`)
        }
        if (isbn.type === 'ISBN_13') {
          isbnArray.push(`ISBN13: ${isbn.identifier}`)
        }
      }
      return isbnArray
    }
    else {
      return isbnArray
    }
  }
}
