import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseFilters
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ParrotsService } from './parrots.service.js';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './entities/parrot.entity.js';
import { ClassValidatorPipe } from '../common/pipes/class-validator.pipe.js';
import { ClassValidatorExceptionFilter } from '../common/filters/class-validator-exception.filter.js';

@ApiTags('Parrots')
@Controller('parrots')
@UseFilters(ClassValidatorExceptionFilter)
export class ParrotsController {
  constructor(private readonly parrotsService: ParrotsService) { }

  // задекорировать api-спецификацию, дописать возвращаемый тип (1 балл);
  // 
  // реализовать фильтр для обработки исключений, выбрасываемых пайпом 
  // `class-validator.pipe.ts`, по аналогии с фильтром `zod-exception.filter.ts`, 
  // для стандартизации формата ответов в случае ошибок валидации (1 балл);

  @Post()
  @ApiOperation({ summary: 'Создать нового попугая' })
  @ApiResponse({ status: 201, description: 'Попугай успешно создан', type: Parrot })
  @ApiResponse({ status: 422, description: 'Ошибка валидации тела запроса' })
  create(@Body(ClassValidatorPipe) createParrotDto: CreateParrotDto):Parrot {
    return this.parrotsService.create(createParrotDto);
  }

  // задекорировать api-спецификацию, дописать возвращаемый тип  (1 балл)
  @Get()
  @ApiOperation({ summary: 'Получить список всех попугаев' })
  @ApiResponse({ status: 200, description: 'Список всех попугаев', type: [Parrot] })
  findAll() {
    return this.parrotsService.findAll();
  }

  // задекорировать api-спецификацию (1 балл)
  // валидировать id, добавить возвращаемый тип (1 балл)
  // в случае отсутствия записи выбрасывать верное исключение (1 балл)
  @Get(':id')
  @ApiOperation({ summary: 'Получить попугая по id' })
  @ApiParam({ name: 'id', description: 'ID попугая', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Попугай найден', type: Parrot })
  @ApiResponse({ status: 400, description: 'ID должен быть числом' })
  @ApiResponse({ status: 404, description: 'Попугай не найден' })
  findOne(@Param('id', ParseIntPipe) id: number): Parrot {
    return this.parrotsService.findOne(id);
  }

  // задекорировать api-спецификацию (1 балл)
  // валидировать id и тело запроса, добавить возвращаемый тип (1 балл)
  // в случае отсутствия записи выбрасывать верное исключение (1 балл)
  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные попугая' })
  @ApiParam({ name: 'id', description: 'ID попугая', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Попугай обновлен', type: Parrot })
  @ApiResponse({ status: 400, description: 'ID должен быть числом' })
  @ApiResponse({ status: 404, description: 'Попугай не найден' })
  @ApiResponse({ status: 422, description: 'Ошибка валидации тела запроса' })
  update(@Param('id', ParseIntPipe) id: number, @Body(ClassValidatorPipe) updateParrotDto: UpdateParrotDto): Parrot {
    return this.parrotsService.update(id, updateParrotDto);
  }
}
