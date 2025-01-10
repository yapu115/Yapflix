import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css',
})
export class LoadingScreenComponent {
  isLoading = true; // Estado inicial

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      // Simula la carga de datos con un retraso
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Aquí iría la lógica para cargar tus datos, como una llamada HTTP
      // Ejemplo: this.data = await this.dataService.getData();
    } finally {
      this.isLoading = false; // Oculta el spinner al finalizar
    }
  }
}
