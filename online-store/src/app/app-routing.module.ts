import { NgModule } from '@angular/core';
import { RouterModule, Routes, /*PreloadAllModules*/ } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

import { NotFoundComponent } from './not-found/not-found.component';

//import { CustomPreloadService } from './services/custom-preload.service';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./website/website.module').then((m) => m.WebsiteModule),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    canActivate: [AdminGuard],
    loadChildren: () => import('./cms/cms.module').then((m) => m.CmsModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

/**
 * Set preloadingStrategy to PreloadAllModules to preload all lazy loaded modules,
 * recommended for small apps, for bigger apps use custom preloading strategy.
 *
 * Set preloadingStrategy to QuicklinkStrategy to preload all lazy loaded modules
 * that are in the viewport or close to it using Quicklink library. (Recommended)
 */
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: /*PreloadAllModules*//*CustomPreloadService*/QuicklinkStrategy }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
