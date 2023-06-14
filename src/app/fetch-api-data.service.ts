import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://myflixapi-11d1.onrender.com/';
@Injectable({
    providedIn: 'root'
})

export class UserRegistrationService {
    // Inject the HttpClient module to the constructor params
    // This will provide HttpClient to the entire class, making it available via this.http

    constructor(private http: HttpClient) {
    }

    // Making the api call for the user registration endpoint

    public userRegistration(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'users', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    public userLogin(userDetails: any): Observable<any> {
        console.log(userDetails);
        return this.http.post(apiUrl + 'login', userDetails).pipe(
            catchError(this.handleError)
        );
    }

    getAllMovies(): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies', {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    getOneMovie(movieName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/' + movieName, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    getDirector(directorName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + '/movies/director/' + directorName, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    getGenre(genreName: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'movies/genre/' + genreName, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    getUser(username: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    getFavouriteMovies(username: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.get(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            map(data => data.favoriteMovies),
            catchError(this.handleError)
        );
    }

    addFavouriteMovie(username: string, movieID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    editUser(username: string, userDetails: object): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.put(apiUrl + 'users/' + username, userDetails, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    deleteUser(username: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + username, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    deleteFavouriteMovie(username: string, movieID: string): Observable<any> {
        const token = localStorage.getItem('token');
        return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
            headers: new HttpHeaders(
                {
                    Authorization: 'Bearer ' + token
                }
            )
        }).pipe(
            map(this.extractResponseData),
            catchError(this.handleError)
        );
    }

    // Non-typed response extraction
    private extractResponseData(res: any): any {
        const body = res;
        return body || {};
    }

    private handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            console.error('Some error occurred:', error.error.message);
        } else {
            console.error(
                `Error Status code ${error.status}, ` +
                `Error body is: ${error.error}`);
        }
        return throwError(
            'Something bad happened; please try again later.');
    }
}