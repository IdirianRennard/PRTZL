import { ReportsComponent } from './main/reports/reports.component';
import { PlayToWinComponent } from './main/play-to-win/play-to-win.component';
import { GameCheckInComponent } from './main/game-check-in/game-check-in.component';
import { GameCheckOutComponent } from './main/game-check-out/game-check-out.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerRegComponent } from './main/player-reg/player-reg.component';

const routes: Routes = [
  { path: 'player_reg', component: PlayerRegComponent },
  { path: 'checkout', component: GameCheckOutComponent },
  { path: 'checkin', component: GameCheckInComponent },
  { path: 'play_to_win', component: PlayToWinComponent },
  { path: 'reports', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
