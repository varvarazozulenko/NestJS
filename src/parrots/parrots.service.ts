import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './entities/parrot.entity.js';

@Injectable()
export class ParrotsService {
  // реализовать и типизировать (1 балл)
  private parrots: Parrot[] = [];
  private nextId = 1;
  
  create(createParrotDto: CreateParrotDto): Parrot {
    const newParrot: Parrot = {
      id: this.nextId++,
      ...createParrotDto,
    };
    this.parrots.push(newParrot);
    return newParrot;
  }

  // реализовать и типизировать  (1 балл)
  findAll(): Parrot[] {
    return this.parrots;
  }

  // реализовать и типизировать  (1 балл)
  findOne(id: number): Parrot {
    const parrot = this.parrots.find((p) => p.id === id);
    if (!parrot) {
      throw new NotFoundException(`Попугай с id #${id} не найден`);
    }
    return parrot;
  }

  // реализовать и типизировать (1 балл)
  update(id: number, updateParrotDto: UpdateParrotDto): Parrot {
    const parrot = this.findOne(id);
    Object.assign(parrot, updateParrotDto);
    return parrot;
  }
}
