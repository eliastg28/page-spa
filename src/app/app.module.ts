import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './employes/form/form.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from '@hardpool/ngx-spinner';
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';

@NgModule({
  declarations: [AppComponent, FormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    // NgxAwesomePopupModule.forRoot(),
    // DialogConfigModule.forRoot(),
    // ConfirmBoxConfigModule.forRoot(),
    // ToastNotificationConfigModule.forRoot(),
    NgxAwesomePopupModule.forRoot({
      ColorList: {
        Success: '#3caea3', // optional
        Info: '#2f8ee5', // optional
        Warning: '#ffc107', // optional
        Danger: '#e46464', // optional
      },
    }),
    ToastNotificationConfigModule.forRoot( {GlobalSettings: {
      AllowedNotificationsAtOnce: 5
   }}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
