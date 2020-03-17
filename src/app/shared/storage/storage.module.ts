import { CookieService } from 'ngx-cookie-service';
import { NgModule } from '@angular/core';

import { CookieStorageService } from './cookie-storage.service';
import { LocalStorageService } from './local-storage.service';

@NgModule({
  declarations: [
  ],
  imports: [
  ],
  exports: [
  ],
  providers: [
    CookieService,
    CookieStorageService,
    LocalStorageService
  ]
})
export class StorageModule {
}
