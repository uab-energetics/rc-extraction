import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import {Instance} from "./Instance";
import {Task} from "./Task";

@Entity()
@Index(['instance', 'uuid'], {unique: true})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column('uuid')
    uuid: string

    @ManyToOne(type => Instance, instance => instance.users, {onDelete: "CASCADE"})
    @JoinColumn()
    instance: Instance[]

    @OneToMany(type => Task, task => task.user)
    tasks: Task[]


}