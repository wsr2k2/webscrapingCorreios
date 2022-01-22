import {Entity, ObjectIdColumn, ObjectID, Column} from "typeorm";

@Entity()
export class Cep {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    cep: string;

    @Column()
    rua: string;

    @Column()
    bairro: string;

    @Column()
    cidade_uf: string;
}
