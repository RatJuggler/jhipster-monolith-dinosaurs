import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DinosaursSharedModule } from 'app/shared/shared.module';
import { CladeComponent } from './clade.component';
import { CladeDetailComponent } from './clade-detail.component';
import { CladeUpdateComponent } from './clade-update.component';
import { CladeDeleteDialogComponent } from './clade-delete-dialog.component';
import { cladeRoute } from './clade.route';

@NgModule({
  imports: [DinosaursSharedModule, RouterModule.forChild(cladeRoute)],
  declarations: [CladeComponent, CladeDetailComponent, CladeUpdateComponent, CladeDeleteDialogComponent],
  entryComponents: [CladeDeleteDialogComponent],
})
export class DinosaursCladeModule {}
