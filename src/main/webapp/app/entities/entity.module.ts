import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'era',
        loadChildren: () => import('./era/era.module').then(m => m.DinosaursEraModule)
      },
      {
        path: 'clade',
        loadChildren: () => import('./clade/clade.module').then(m => m.DinosaursCladeModule)
      },
      {
        path: 'dinosaur',
        loadChildren: () => import('./dinosaur/dinosaur.module').then(m => m.DinosaursDinosaurModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class DinosaursEntityModule {}
