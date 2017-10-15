import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RootComponent } from './Components/Root/root-component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    RootComponent
  ],
  providers: [],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
