import { API_KEY } from 'ng-google-sheets-db';
import { QuickPlayToWinComponent } from './main/quick-play-to-win/quick-play-to-win.component';
import { ReportsComponent } from './main/reports/reports.component';
import { PlayToWinComponent } from './main/play-to-win/play-to-win.component';
import { GameCheckInComponent } from './main/game-check-in/game-check-in.component';
import { GameCheckOutComponent } from './main/game-check-out/game-check-out.component';
import { PlayerRegComponent } from './main/player-reg/player-reg.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './main/main.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { GemboxComponent } from './main/gembox/gembox.component';
import { APIInterceptor } from 'src/assets/classes/APIInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    GameCheckInComponent,
    GameCheckOutComponent,
    GemboxComponent,
    MainComponent,
    PlayToWinComponent,
    PlayerRegComponent,
    QuickPlayToWinComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: API_KEY,
      useValue: "AIzaSyA0xCJqEYpfHe1VYCdTnKcGmzuTK_cLrJ4",
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
