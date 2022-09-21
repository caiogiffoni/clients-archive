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
@Unique(["email"])
class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contact: string;

  @ManyToOne(() => Client, (client) => client.contacts)
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Contact };
