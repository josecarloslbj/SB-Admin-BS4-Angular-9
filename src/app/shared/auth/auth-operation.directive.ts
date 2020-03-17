import { Directive, ElementRef, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[pdAuthOperation]'
})
export class AuthOperationDirective implements OnInit, OnDestroy {
  sub: Subscription;

  @Input() pdAuthOperation: string;

  constructor(private el: ElementRef, private authService: AuthService) {
  }

  ngOnInit() {
    // this.sub = this.authService.userOperations.subscribe((permissions) => {
    //   if (!permissions.hasOwnProperty(this.pdAuthOperation)) {
    //     this.el.nativeElement.disabled = true;
    //   } else {
    //     this.el.nativeElement.disabled = false;
    //   }
    // });
  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }
}
