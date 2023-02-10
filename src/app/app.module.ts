import { NgZorroAntdModule } from './ng-zorro-antd.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { MonitorComponent } from './pages/dashboard/monitor/monitor.component';
import { LeaveComponent } from './pages/form/leave/leave.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AppInitService } from './app-init.service';

export function initializeApp(appInitService: AppInitService ) {
  return (): Promise<any> => {
    return appInitService.Init();
  }
}

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    LeaveComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NgZorroAntdModule
  ],
  providers: [
    AppInitService,
    { provide: NZ_I18N, useValue: en_US },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppInitService], multi: true},
    { provide: NzMessageService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
