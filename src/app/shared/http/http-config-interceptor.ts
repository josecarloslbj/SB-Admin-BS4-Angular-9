import { throwError as observableThrowError, Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";

//import { MessagesService } from "../message/message.service";
import { isString, isArray } from "util";
import { Router } from "@angular/router";
import { ConfigService } from "../config/config.service";
import { AuthService } from "../auth/auth.service";
//import { LoaderService } from "../loader/loader.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  accessDeniedRoute: string;
  maintenanceRoute: string;

  constructor(
    //private messagesService: MessagesService,
    private router: Router,
    private configService: ConfigService,
    private authService: AuthService
    //private loaderService: LoaderService
  ) {

    debugger;
    // this.accessDeniedRoute = this.configService.obterConfiguracao(
    //   this.configService.ACCESS_DENIED_ROUTE_CONFIG
    // );
    // this.maintenanceRoute = this.configService.obterConfiguracao(
    //   this.configService.MAINTENANCE_ROUTE_CONFIG
    // );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        "Content-Type": "application/json"
      }
    });

    return next.handle(req).pipe(
      map(obj => {
        return this.parseResponse(obj);
      }),
      catchError((error: HttpErrorResponse, caught) => {
        switch (error.status) {
          case 401:
            //this.loaderService.hide();
            this.authService.obterFuncionalidadesDoUsuario();
            if (error.error) {
              this.router.navigate([this.accessDeniedRoute], {
                queryParams: { message: error.error }
              });
            } else {
              this.router.navigate([this.accessDeniedRoute]);
            }
            break;
          case 503:
            //this.loaderService.hide();
            this.router.navigate([this.maintenanceRoute]);
            break;
          default:
            this.showError(error);
            break;
        }
        return observableThrowError(error);
      })
    );
  }

  parseResponse(obj) {
    if (obj && obj.body) {
      obj.body = this.recursiveParser(obj.body);
    }
    return obj;
  }

  recursiveParser(body) {
    if (typeof body === "object" || Array.isArray(body)) {
      for (const index in body) {
        if (body.hasOwnProperty(index)) {
          const currentProp = body[index];

          if (Array.isArray(currentProp)) {
            body[index] = this.recursiveParser(currentProp);
          } else if (typeof currentProp === "object") {
            body[index] = this.recursiveParser(currentProp);
          } else if (typeof currentProp === "string") {
            body[index] = this.dateReviver(currentProp);
          } else {
            body[index] = currentProp;
          }
        }
      }
    }

    return body;
  }

  dateReviver(value) {
    const a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(
      value
    );
    if (a) {
      return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
    }

    return value;
  }

  showError(error) {
    if (isArray(error)) {
      let message = "";
      for (const index in error) {
        if (error.hasOwnProperty(index)) {
          const currentError = error[index];
          if (!currentError.ocultar) {
            message += "<p>&#9679; " + currentError.message + "</p>";
          }
        }
      }
      if (message !== "") {
        //this.messagesService.sendInfo(message, "Erro");
      }
    } else if (isString(error)) {
    //  this.messagesService.sendInfo(error, "Erro");
    } else if (error.errors) {
      this.showError(error.errors);
    } else if (error.error) {
      if (error.error.errors) {
        this.showError(error.error.errors);
      } else if (isArray(error.error)) {
        this.showError(error.error);
      } else if (error.error.error) {
        if (!error.error.error.ocultar) {
          //this.messagesService.sendInfo(
          //  error.error.error.stack,
         //   error.error.error.message
         // );
        }
      } else if (isString(error.error)) {
        try {
          const errorObj = JSON.parse(error.error);
          if (errorObj && errorObj.errors) {
            let message = "";
            for (const index in errorObj.errors) {
              if (errorObj.errors.hasOwnProperty(index)) {
                const currentError = errorObj.errors[index];
                if (!currentError.ocultar) {
                  message += "<p>&#9679; " + currentError.message + "</p>";
                }
              }
            }
            if (message !== "") {
              //this.messagesService.sendInfo(message);
            }
          }
        } catch (ex) {
          console.error(`${error.status} (${error.statusText}): ${error.error}\nURL: ${error.url}`);
          //this.messagesService.sendInfo(error.error.toString(), 'Erro');
        }
      }
    } else if (isString(error.message)) {
      if (!error.ocultar) {
        if (error.field) {
          //this.messagesService.sendInfo(error.message, "Erro");
        } else {
          //this.messagesService.sendInfo(
          //  error.message,
          //  `Erro: ${error.status} - ${error.statusText}`
          //);
        }
      }
    }
  }
}
