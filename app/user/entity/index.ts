import { v4 as uuid } from "uuid";
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from "typeorm";

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({default: false})
    is_admin: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
    
    constructor() {
      if (!this.id) {
        this.id = uuid()
      }

      // TODO: encriptar password nesse momento
      const encryptedPassword = this.password
      this.password = encryptedPassword 
    }
}

export default User;
