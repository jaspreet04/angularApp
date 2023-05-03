import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signupUser(username: string, email: string, password: string){
    this.authService.signupUser(username, email, password).subscribe((res: object ) => console.log(res))
  }
}
