import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { OnExit } from '../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnExit{
  onExit: () => boolean | Promise<boolean> | Observable<boolean> = () => {
    return confirm('Are you sure you want to leave this page?');
  };
}
