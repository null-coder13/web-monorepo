import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Entry } from './models/entry';

@Injectable({
  providedIn: 'root'
})
export class DogService {
  url: string = 'https://localhost:7283/api/Entries/'

  constructor(private http: HttpClient) { }

  getEntries() {
    return this.http.get<Entry[]>(this.url).pipe(catchError(this.handleError));
  }

  postEntry(entry: Entry) {
    return this.http.post<Entry>(this.url, entry).pipe(catchError(this.handleError));
  }

  getEntryById(id: string | Date) {
    return this.http.get<Entry>(this.url + id).pipe(catchError(this.handleError));
  }

  updateEntryById(entry: Entry) {
    return this.http.put<Entry>(this.url + entry.dateTimeId, entry).pipe(catchError(this.handleError));
  }

  deleteEntryById(entry: Entry) {
    return this.http.delete(this.url + entry.dateTimeId).pipe(catchError(this.handleError));
  }

  getLastEntryForDog(name: string) {
    return this.http.get<Entry>(this.url + "Last/" + name).pipe(catchError(this.handleError));
  }

  getLastPeeForDog(name: string) {
    return this.http.get<Entry>(this.url + "LastPee/" + name).pipe(catchError(this.handleError));
  }

  getLastPooForDog(name: string) {
    return this.http.get<Entry>(this.url + "LastPoo/" + name).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Error contacting server.'));
  }
}
