import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-movie-card',
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
    movies: any[] = [];
    favoriteMovies: string[] = [];

    constructor(
        public fetchApiData: FetchApiDataService,
        private router: Router,
        public dialog: MatDialog,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getMovies();
        this.getFavoriteMovies();
    }

    /**
     * Navigate to profile
     */

    goToProfile(): void {
        this.router.navigate(["profile"]);
    }

    /**
     * Logout user and return to welcome page
     */

    logout(): void {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.router.navigate(["welcome"]);
    }

    /**
     * Get all movies from API
     * @returns movies
     */

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((resp: any) => {
            this.movies = resp;
            return this.movies;
        });
    }

    /**
     * Get users favorite movies
     * @returns favouriteMovies
     */

    getFavoriteMovies(): void {
        this.fetchApiData.getFavouriteMovies(localStorage.getItem("user") || "").subscribe((resp: any) => {
            this.favoriteMovies = resp;
            return this.favoriteMovies;
        })
    }

    /**
     * Add or remove movie from favorite list
     * @param id 
     */

    toggleFavorite(id: string): void {
        if (this.favoriteMovies.includes(id)) {
            // Remove from favorites
            this.fetchApiData.deleteFavouriteMovie(localStorage.getItem("user") || "", id).subscribe((resp: any) => {
                this.snackBar.open("Successfully removed movie from favorites", 'OK', {
                    duration: 4000
                });
                this.getFavoriteMovies();
            });
        } else {
            // Add to favorites
            this.fetchApiData.addFavouriteMovie(localStorage.getItem("user") || "", id).subscribe((resp: any) => {
                this.snackBar.open("Successfully added movie to favorites", 'OK', {
                    duration: 4000
                });
                this.getFavoriteMovies();
            });
        }
    }

    /**
     * Open genre dialogue
     * @param genre 
     */

    openGenre(genre: any): void {
        this.dialog.open(GenreComponent, {
            maxWidth: "600px",
            data: genre
        })
    }

    /**
     * Open director dialogue
     * @param director 
     */

    openDirector(director: any): void {
        this.dialog.open(DirectorComponent, {
            maxWidth: "600px",
            data: director
        })
    }

    /**
     * Open movie details dialouge
     * @param movie 
     */

    openMovie(movie: any): void {
        this.dialog.open(MovieDetailsComponent, {
            maxWidth: "600px",
            data: movie
        })
    }
}
