import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RootComponent } from './Components/Root/root-component';

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
