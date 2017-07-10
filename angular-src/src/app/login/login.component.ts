import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  alertMsg: String;
  alertMsgSuccess: String;
  constructor(private _authServer: AuthService, private _router: Router) { }

  ngOnInit() {
  }
  onLoginSubmit(form) {
    const user = {
      username:form.username,
      password: form.password
    }
   if(user.username != undefined || user.password || undefined) {
    this._authServer.authenticateUser(user).subscribe(data => {
      console.log(data)
      if(data.success == true) {
        this.alertMsgSuccess = 'Login succesfull. Redirecting..'
        this.alertMsg = null;
          setTimeout(()=> {
              this._authServer.storeUserData(data.token,data.user);
              this._router.navigate(['dashboard']);
          },3000);      
      }else {
        this.alertMsg = data.msg;
      }

    })

   }else {
     this.alertMsg = "Invalid username or password"
     this.alertMsgSuccess = null;
   }

  }
 
}
