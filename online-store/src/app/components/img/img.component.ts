import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  @Input() img!: string;
  @Output() loaded = new EventEmitter<string>();
  imgDefault = 'https://www.w3schools.com/howto/img_avatar2.png';

  imgError() {
    this.img = this.imgDefault;
  }

  imgLoaded() {
    this.loaded.emit(this.img);
  }
}
