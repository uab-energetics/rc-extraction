import {Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Publication} from "./Publication";
import {User} from "./User";
import {Task} from "./Task";

@Entity()
export class Instance {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar')
    projectId: string

    @Column('varchar')
    displayName: string

    @Column('text')
    description: string

    @Column('varchar')
    codebookId: string

    @Column('varchar')
    codebookVersion: string

    @OneToMany(type => Publication, publication => publication.instance)
    publications: Publication[]

    @OneToMany(type => User, user => user.instance)
    users: User[]

    @OneToMany(type => Task, task => task.instance)
    tasks: Task[]


}