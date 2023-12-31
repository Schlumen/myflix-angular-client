import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-login-form',
    templateUrl: './user-login-form.component.html',
    styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

    @Input() userData = { username: '', password: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public dialogRef: MatDialogRef<UserLoginFormComponent>,
        public snackBar: MatSnackBar,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    /**
     *  This is the function responsible for sending the form inputs to the backend
     */
    loginUser(): void {
        this.fetchApiData.userLogin(this.userData).subscribe((result) => {
            // Logic for a successful user login goes here! (To be implemented)
            this.dialogRef.close(); // This will close the modal on success!
            localStorage.setItem("user", result.user.username);
            localStorage.setItem("token", result.token);
            this.snackBar.open(result.user.username + " successfully logged in", 'OK', {
                duration: 4000
            });
            this.router.navigate(["movies"]);
        }, (result) => {
            this.snackBar.open(result, 'OK', {
                duration: 4000
            });
        });
    }

}
