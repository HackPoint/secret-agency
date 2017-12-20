import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgentsService } from './shared/services/agents.service';
import { AgentsListComponent } from './agents-list/agents-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AgentsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AgentsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
