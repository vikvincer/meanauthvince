import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: Object;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        console.log(this.user)
    },err => {
      console.log(err);
      return false;
    });
  }
  

}
