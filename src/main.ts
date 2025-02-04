import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* 전역 파이프를 적용할 떄 사용, 데이터를 검증하거나 변환하는데 사용 */
  app.useGlobalPipes(
    /* 데이터 검증시 사용 */
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 필드는 자동으로 제거
      forbidNonWhitelisted: true, // DTO에 없는 필드가 들어오면 요청 자체를 거부
      transform: true, // DTO 타입으로 자동 변환
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
