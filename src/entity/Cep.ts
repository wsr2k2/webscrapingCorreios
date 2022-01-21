import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class Cep {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    cep: string;
}
