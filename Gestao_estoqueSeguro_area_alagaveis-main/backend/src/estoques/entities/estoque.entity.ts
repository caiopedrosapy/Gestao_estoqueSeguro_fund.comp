import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('estoques')
export class Estoque {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 120 })
  nome!: string;

  @Column({ type: 'varchar', length: 200 })
  localizacao!: string;

  @Column({ name: 'altura_cm', type: 'integer' })
  alturaCm!: number;

  @Column({ type: 'boolean', default: false })
  seguro!: boolean;
}
