import {Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Publication} from "./Publication";
import {User} from "./User";
import {Instance} from "./Instance";


@Entity()
export class Task {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(type => Publication, publication => publication.tasks, {onDelete: 'CASCADE'})
    @JoinColumn()
    publication: Publication

    @ManyToOne(type => Instance, instance => instance.tasks, {onDelete: 'CASCADE'})
    @JoinColumn()
    instance: Instance

    @ManyToOne(type => User, user => user.tasks, {onDelete: 'CASCADE'})
    user: User


}
