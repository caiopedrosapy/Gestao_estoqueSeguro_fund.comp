import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Estoque } from '../../estoques/entities/estoque.entity.js';

export enum NivelAlerta {
  BAIXO = 'BAIXO',
  MEDIO = 'MEDIO',
  ALTO = 'ALTO',
}

@Entity('alertas')
export class Alerta {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'estoque_id', type: 'integer' })
  estoqueId!: number;

  @ManyToOne(() => Estoque, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'estoque_id' })
  estoque!: Relation<Estoque>;

  @Column({ type: 'varchar', length: 160 })
  titulo!: string;

  @Column({ type: 'varchar', length: 5 })
  nivel!: NivelAlerta;

  @Column({ type: 'varchar', length: 2000 })
  descricao!: string;

  @Column({ type: 'boolean', default: true })
  ativo!: boolean;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm!: Date;
}
