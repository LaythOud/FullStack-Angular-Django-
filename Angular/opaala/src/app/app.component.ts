import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastComponent } from "./components/toast/toast.component";
import { LoadingComponent } from "./components/loading/loading.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, ToastComponent, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'opaala';
}
