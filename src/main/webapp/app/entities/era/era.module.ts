import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { EraComponent } from './list/era.component';
import { EraDetailComponent } from './detail/era-detail.component';
import { EraUpdateComponent } from './update/era-update.component';
import { EraDeleteDialogComponent } from './delete/era-delete-dialog.component';
import { EraRoutingModule } from './route/era-routing.module';

@NgModule({
  imports: [SharedModule, EraRoutingModule],
  declarations: [EraComponent, EraDetailComponent, EraUpdateComponent, EraDeleteDialogComponent],
  entryComponents: [EraDeleteDialogComponent],
})
export class EraModule {}
