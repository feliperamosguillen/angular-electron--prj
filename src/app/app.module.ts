import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PortafolioComponent } from './portafolio/portafolio.component';
import { MenuComponent } from './-menu/-menu.component';

const appRoutes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: "home",
		component: HomeComponent
	},
	{
		path: "portafolio",
		component: PortafolioComponent
	},
  ];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PortafolioComponent,
    MenuComponent
  ],
  imports: [
	RouterModule.forRoot(
		appRoutes,
		{ enableTracing: false } // <-- debugging purposes only
	),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
