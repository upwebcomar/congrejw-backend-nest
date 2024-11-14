import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Permite solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const port = process.env.PORT || 3000;
  
  // Log del puerto al que se está conectando
  const logger = new Logger('Main Bootstrap');
  logger.log(`La aplicación está corriendo en el puerto ${port}`);

  await app.listen(port);
}
bootstrap();
