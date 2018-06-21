import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm";
import {Instance} from "./Instance";
import {Task} from "./Task";

@Entity()
@Index(['instance', 'email'], {unique: true})
export class User {

    @PrimaryColumn('uuid')
    id: string

    @Column('varchar')
    email: string

    @ManyToOne(type => Instance, instance => instance.users)
    @JoinColumn()
    instance: Instance[]

    @OneToMany(type => Task, task => task.user)
    tasks: Task[]


}