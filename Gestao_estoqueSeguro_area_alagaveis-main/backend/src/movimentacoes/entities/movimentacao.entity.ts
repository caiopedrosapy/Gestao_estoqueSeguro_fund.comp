import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity.js';

export enum TipoMovimentacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA',
}

@Entity('movimentacoes')
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'produto_id', type: 'integer' })
  produtoId!: number;

  @ManyToOne(() => Produto, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'produto_id' })
  produto!: Relation<Produto>;

  @Column({ type: 'varchar', length: 7 })
  tipo!: TipoMovimentacao;

  @Column({ type: 'integer' })
  quantidade!: number;

  @CreateDateColumn({ name: 'criada_em', type: 'timestamptz' })
  criadaEm!: Date;
}