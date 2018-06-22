import {Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryColumn} from "typeorm"
import {Instance} from "./Instance";
import {Task} from "./Task";


@Entity()
@Index(['instance', 'id'], {unique: true})
export class Publication {
    @PrimaryColumn()
    id: number

    @Column({type: 'int', default: 0})
    priority: number

    @OneToMany(type => Task, task => task.publication)
    tasks: Task[]

    @ManyToOne(type => Instance, instance => instance.publications, {onDelete: 'CASCADE'})
    @JoinColumn()
    instance: Instance
}