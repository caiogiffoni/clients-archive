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

  @Entity("user")
  @Unique(["email"])
  class User {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    password: string;
  
    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Client, (client) => client.user)
    clients: Client[]
  
    constructor() {
      if (!this.id) {
        this.id = uuid();
      }
    }
  }
  export { User };
  