import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DinosaursSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [DinosaursSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [DinosaursSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DinosaursSharedModule {
  static forRoot() {
    return {
      ngModule: DinosaursSharedModule
    };
  }
}
