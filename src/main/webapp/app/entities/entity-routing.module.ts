import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'era',
        data: { pageTitle: 'Eras' },
        loadChildren: () => import('./era/era.module').then(m => m.EraModule),
      },
      {
        path: 'clade',
        data: { pageTitle: 'Clades' },
        loadChildren: () => import('./clade/clade.module').then(m => m.CladeModule),
      },
      {
        path: 'dinosaur',
        data: { pageTitle: 'Dinosaurs' },
        loadChildren: () => import('./dinosaur/dinosaur.module').then(m => m.DinosaurModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
