import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgentsService } from './shared/services/agents.service';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { GeolocatorService } from './shared/services/google-api/geolocator.service';
import { MaxMinPipe } from './shared/pipes/maxmin.pipe';


@NgModule({
  declarations: [
    AppComponent,
    AgentsListComponent,
    MaxMinPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AgentsService, GeolocatorService, MaxMinPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
