import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
    movies: any[] = [];
    constructor(
        public fetchApiData: FetchApiDataService,
        private router: Router) { }

    ngOnInit(): void {
        this.getMovies();
    }

    goToProfile(): void {
        this.router.navigate(["profile"]);
    }

    logout(): void {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.router.navigate(["welcome"]);
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            console.log(this.movies);
            return this.movies;
        });
    }
}
