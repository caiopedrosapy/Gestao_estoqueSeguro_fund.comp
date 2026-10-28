import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

describe('AppController', () => {
  it('retorna a mensagem da rota inicial', () => {
    const controller = new AppController(new AppService());
    expect(controller.getHello()).toBe('Hello World!');
  });
});
