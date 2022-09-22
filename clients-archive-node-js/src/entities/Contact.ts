import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { v4 as uuid } from "uuid";
import { Client } from "./Clients";

@Entity("contact")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @ManyToOne(() => Client, (client) => client.contacts, { eager: true })
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Contact };
