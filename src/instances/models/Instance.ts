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

    @Column('text', {nullable: true})
    description: string

    @Column('varchar', {nullable: true})
    codebookId: string

    @Column('varchar', {nullable: true})
    codebookVersion: string

    @OneToMany(type => Publication, publication => publication.instance)
    publications: Publication[]

    @OneToMany(type => User, user => user.instance)
    users: User[]

    @OneToMany(type => Task, task => task.instance)
    tasks: Task[]


}