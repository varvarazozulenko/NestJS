import { ApiProperty } from '@nestjs/swagger';

export class Parrot {
  @ApiProperty({ example: 1, description: 'Уникальный id попугая' })
  id: number;

  @ApiProperty({ example: 'Кеша', description: 'Имя попугая' })
  name: string;

  @ApiProperty({ example: 'Ара', description: 'Порода попугая' })
  breed: string;
}
