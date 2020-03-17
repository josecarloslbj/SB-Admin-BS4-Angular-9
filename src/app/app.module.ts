import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './shared/auth/auth.module';

import { ConfigService } from './shared/config/config.service';

import { HttpConfigModule } from './shared/http/http-config.module';
import { StorageModule } from './shared/storage/storage.module';
import { DirectivesModule } from './shared/directives/directives.module';
import { WINDOW_PROVIDERS } from './shared/core/providers/window.provider';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        // HttpConfigModule,
        HttpClientModule,
        DirectivesModule.forRoot(),
        HttpConfigModule,
        StorageModule,
        AuthModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        WINDOW_PROVIDERS,
        ConfigService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
