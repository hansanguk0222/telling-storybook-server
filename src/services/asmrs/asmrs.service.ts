import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asmr } from '@/entities/asmrs/asmrs.entity';

@Injectable()
export class AsmrsService {
  constructor(
    @InjectRepository(Asmr)
    private readonly asmrsRepository: Repository<Asmr>,
  ) {
    this.asmrsRepository = asmrsRepository;
  }

  getAllAsmrList(): Promise<Asmr[]> {
    return this.asmrsRepository.find();
  }
}
