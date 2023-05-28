import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth?: boolean;
  subscribtion?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscribtion = this.authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy(): void {
    this.subscribtion?.unsubscribe();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logOut();
  }
}
