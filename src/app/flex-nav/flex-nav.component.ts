import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-flex-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './flex-nav.component.html',
  styleUrl: './flex-nav.component.css',
})
export class FlexNavComponent {}
