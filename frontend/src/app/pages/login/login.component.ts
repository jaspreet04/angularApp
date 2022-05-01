import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import apiResponse from 'src/app/model/apiResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(email:string, password: string){
    this.userService.loginUser(email,password)
      .subscribe((res: apiResponse ) => {
        console.log("User is logged in");
        if(res.status == "ok")
          this.router.navigateByUrl('/dashboard');
        else
          alert(res.message);
      })
  }

}
