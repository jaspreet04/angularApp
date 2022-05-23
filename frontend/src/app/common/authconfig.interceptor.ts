import { UserService } from './../services/user.service';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userService.getToken();
        req = req.clone({
            setHeaders: {
                //Authorization: "Bearer " + authToken
                token: authToken
            }
        });
        return next.handle(req);
    }
}