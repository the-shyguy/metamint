import { BeforeInsert, Column, Entity as TOEntity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { makeId } from "../util/helpers";
import Entity from "./Entity";
import { Post } from "./Post";
import User from "./User";
import Vote from "./Votes";


@TOEntity('comments')
export class Comment extends Entity {

    constructor(comment: Partial<Comment>) {
        super();
        Object.assign(this, comment)
    }

    @Index()
    @Column()
    identifier: string

    @Column()
    body: string

    @Column()
    username: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'username', referencedColumnName: 'username' })
    user: User

    @ManyToOne(() => Post, post => post.comments, { nullable: false })
    post: Post

    @OneToMany(() => Vote, vote => vote.comment)
    vates: Vote[]

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(8)
    }
}
