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
import { Contact } from "./Contact";
import { User } from "./User";

@Entity("client")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  telephone: string;

  @CreateDateColumn()
  DOR: Date;

  @ManyToOne(() => User, (user) => user.clients, {
    eager: true,
  })
  user: User;

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
