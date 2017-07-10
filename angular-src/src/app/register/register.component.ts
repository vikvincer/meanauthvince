import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMsg: Array<{}> = [];
  name: String;
  username: String;
  email: String;
  password: String;
  constructor(private _validateService:ValidateService,
              private _authService: AuthService,
              private _router:Router) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    this.errorMsg = [];
   const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
   }
   if(!this._validateService.validateRegister(user)) {
     this.errorMsg.push('Please Fill up all field')   
     return false
   }
   if(!this._validateService.validEmail(user.email)) {
       this.errorMsg.push('Invalid Email')   
       return false
   }
    
  this._authService.registerUser(user).subscribe(data => {
      if(data.success){
        this._router.navigate(['dashboard'])
      }else {
         this._router.navigate(['register'])
      }
  })

  }
}
