import express from 'express';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  // Cadastra todos os middlewares da aplicação
  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

// Exporta uma nova instância de App
// Exporta diretamente o server
export default new App().server;
