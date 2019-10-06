import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [DinosaursSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class DinosaursHomeModule {}
