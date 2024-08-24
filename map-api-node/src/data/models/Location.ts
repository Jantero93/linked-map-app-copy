import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  street: string;

  @Column({ length: 255 })
  streetNumber: string;

  @Column({ length: 1023 })
  city: string;

  @Column("decimal", { precision: 12, scale: 9 })
  longitude: number;

  @Column("decimal", { precision: 12, scale: 9 })
  latitude: number;

  @Column({ nullable: true, length: 1023 })
  suburb?: string;

  @Column({ nullable: true, length: 1023 })
  postalCode: string;
}
