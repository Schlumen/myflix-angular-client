import { Component, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
    user: any = {};
    @Input() userData = { username: '', password: '', email: '', birthdate: '' };

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser(): void {
        this.fetchApiData.getUser(localStorage.getItem("user") || "").subscribe((resp: any) => {
            this.user = resp;
            console.log(this.user);
            return this.user;
        });
    }

    updateUser(): void {
        this.fetchApiData.editUser(localStorage.getItem("user") || "", this.userData).subscribe((resp: any) => {
            console.log(resp);
            this.snackBar.open("Successfully changed userdata", 'OK', {
                duration: 4000
            });
            this.getUser();
        }, (result) => {
            this.snackBar.open(result, 'OK', {
                duration: 4000
            });
        });
    }
}
