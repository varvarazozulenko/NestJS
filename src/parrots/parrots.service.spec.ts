import { Test, TestingModule } from '@nestjs/testing';
import { ParrotsService } from './parrots.service.js';
import { NotFoundException } from '@nestjs/common';

describe('ParrotsService', () => {
  let service: ParrotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParrotsService],
    }).compile();

    service = module.get<ParrotsService>(ParrotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // дописать автотест (1 балл)
  it('сервис реализует создание попугая', () => { 
    const dto = { name: 'Кеша', breed: 'Ара' };
    const parrot = service.create(dto);

    expect(parrot).toHaveProperty('id');
    expect(parrot.name).toBe('Кеша');
    expect(parrot.breed).toBe('Ара');
  });

  // дописать автотест (1 балл)
  it('сервис реализует получение списка попугаев', () => { 
    service.create({ name: 'Вася', breed: 'Какаду' });
    const list = service.findAll();

    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBeGreaterThanOrEqual(1);
  });

  // дописать автотест (1 балл)
  it('сервис реализует получение попугая по id', () => { 
    const created = service.create({ name: 'Гоша', breed: 'Волнистый' });
    const found = service.findOne(created.id);

    expect(found).toEqual(created);
    expect(() => service.findOne(9999)).toThrow(NotFoundException);
  });

  // дописать автотест (1 балл)
  it('сервис реализует обновление попугая', () => { 
    const created = service.create({ name: 'Яша', breed: 'Ара' });
    const updated = service.update(created.id, { name: 'Яков' });

    expect(updated.name).toBe('Яков');
    expect(updated.breed).toBe('Ара');
  });
});
