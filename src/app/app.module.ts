import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DraftResultService } from './dashboard/draft.result/draft.result.service';
import { PlayerService } from './dashboard/player/player.service';
import { DraftService } from './dashboard/draft.service';
import { LeaqueModelService } from './dashboard/leaque.model/leaque.model.service';
import { PositiveNumberPipe } from './positive.number.filter'
import { PlayerFilter } from './player.filter';
import { OrderByPipe } from './orderBy'
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    DashboardComponent, 
    PositiveNumberPipe,
    OrderByPipe,
    PlayerFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PlayerService, DraftService, LeaqueModelService, DraftResultService],
  bootstrap: [DashboardComponent]
})
export class AppModule { }
