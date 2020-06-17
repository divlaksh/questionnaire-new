import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LocalStorageService } from './shared/LocalStorage.service';
import { ServiceProvider } from './shared/services/service-provider';
import { MenuService } from './shared/services/menu.service';
import { CustomerQuestionnaireComponent } from './customer-questionnaire/customer-questionnaire.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';

// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-angular/IBM-SECURITY-BLUEQ/master/dist/assets/i18n/',
        '.json'
    ); */
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule,
        PDFExportModule

    ],
    declarations: [AppComponent, CustomerQuestionnaireComponent],
    providers: [AuthGuard, LocalStorageService, ServiceProvider, MenuService],
    bootstrap: [AppComponent]
})
export class AppModule { }
