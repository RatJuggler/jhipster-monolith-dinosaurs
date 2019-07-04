import { NgModule } from '@angular/core';

import { DinosaursSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [DinosaursSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [DinosaursSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DinosaursSharedCommonModule {}
