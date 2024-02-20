import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { UserComponent } from './pages/user/user.component';
import { OnlineusersComponent } from './components/onlineusers/onlineusers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './common/authconfig.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu'; 
import { MatButtonModule } from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component'

const config: SocketIoConfig = {
	url: 'http://localhost:3000', // socket server url;
	options: {
		transports: ['websocket']
	}
}

@NgModule({
  declarations: [
    AppComponent,

    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UserComponent,
    OnlineusersComponent,
    OnlineusersComponent,
    NavbarComponent,
    ChatBubbleComponent,
    ChatFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [ CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
