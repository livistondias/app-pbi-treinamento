import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PowerBiService } from './powerbi/powerbi.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxPowerBiModule, NgxPowerBiService } from 'ngx-powerbi';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPowerBiModule
  ],
  providers: [PowerBiService,NgxPowerBiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
