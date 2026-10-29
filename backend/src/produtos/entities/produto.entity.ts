import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Estoque } from '../../estoques/entities/estoque.entity.js';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  nome!: string;

  @Column({ type: 'varchar', length: 80 })
  categoria!: string;

  @Column({ type: 'integer', default: 0 })
  quantidade!: number;

  @Column({ type: 'boolean', default: false })
  prioritario!: boolean;

  @Column({ name: 'estoque_id', type: 'integer' })
  estoqueId!: number;

  @ManyToOne(() => Estoque, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'estoque_id' })
  estoque!: Relation<Estoque>;
}
