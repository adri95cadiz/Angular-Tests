import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

// Components
import { ImgComponent } from '../shared/components/img/img.component';
import { ProductComponent } from '../shared/components/product/product.component';
import { ProductListComponent } from '../shared/components/product-list/product-list.component';
// Pipes
import { TimeAgoPipe } from '../shared/pipes/time-ago.pipe';
// Directives
import { HighlightDirective } from '../shared/directives/highlight.directive';

@NgModule({
  declarations: [
    ImgComponent,
    ProductComponent,
    ProductListComponent,
    TimeAgoPipe,
    HighlightDirective,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    ImgComponent,
    ProductComponent,
    ProductListComponent,
    TimeAgoPipe,
    HighlightDirective,
  ],
})
export class SharedModule {}
