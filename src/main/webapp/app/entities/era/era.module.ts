import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared/shared.module';
import { EraComponent } from './era.component';
import { EraDetailComponent } from './era-detail.component';
import { EraUpdateComponent } from './era-update.component';
import { EraDeleteDialogComponent } from './era-delete-dialog.component';
import { eraRoute } from './era.route';

@NgModule({
  imports: [DinosaursSharedModule, RouterModule.forChild(eraRoute)],
  declarations: [EraComponent, EraDetailComponent, EraUpdateComponent, EraDeleteDialogComponent],
  entryComponents: [EraDeleteDialogComponent],
})
export class DinosaursEraModule {}
