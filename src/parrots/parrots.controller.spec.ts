import { Test, TestingModule } from '@nestjs/testing';
import { ParrotsController } from './parrots.controller.js';
import { ParrotsService } from './parrots.service.js';

describe('ParrotsController', () => {
  let controller: ParrotsController;
  let service: ParrotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParrotsController],
      providers: [ParrotsService],
    }).compile();

    controller = module.get<ParrotsController>(ParrotsController);
    service = module.get<ParrotsService>(ParrotsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // дописать автотест (1 балл)
  it('реализовано создание попугая', () => { 
    const dto = { name: 'Кеша', breed: 'Ара' };
    const expectedResult = { id: 1, ...dto };

    vi.spyOn(service, 'create').mockReturnValue(expectedResult);

    expect(controller.create(dto)).toEqual(expectedResult);
  });

  // дописать автотест (1 балл)
  it('реализовано получение списка попугаев', () => { 
    const expectedList = [{ id: 1, name: 'Кеша', breed: 'Ара' }];
    vi.spyOn(service, 'findAll').mockReturnValue(expectedList);

    expect(controller.findAll()).toEqual(expectedList);
  });

  // дописать автотест (1 балл)
  it('реализовано получение попугая по id', () => { 
    const expectedParrot = { id: 1, name: 'Кеша', breed: 'Ара' };
    vi.spyOn(service, 'findOne').mockReturnValue(expectedParrot);

    expect(controller.findOne(1)).toEqual(expectedParrot);
  });

  // дописать автотест (1 балл)
  it('реализовано обновление попугая', () => { 
    const updateDto = { name: 'КешаНовый' };
    const updatedParrot = { id: 1, name: 'КешаНовый', breed: 'Ара' };
    vi.spyOn(service, 'update').mockReturnValue(updatedParrot);

    expect(controller.update(1, updateDto)).toEqual(updatedParrot);
  });
});
