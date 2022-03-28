import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User21646863904590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name:'id',
                        type:'uuid',
                        isPrimary:true
                    },
                    {
                        name: 'first_name',
                        type: 'varchar(20)'
                    },
                    {
                        name: 'last_name',
                        type: 'varchar(20)'
                    },
                    {
                        name: 'email',
                        type: 'varchar(40)',
                        isUnique: true
                    },
                    {
                        name: 'username',
                        type: 'varchar(40)',
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar'
                    },
                    {
                        name:'is_admin',
                        type:'boolean',
                        default: false
                    },
                    {
                        name: 'create_at',
                        type: 'timestamp',
                        default:'now()'
                    },
                    {
                        name:'update_at',
                        type:'timestamp',
                        default:'now()'
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }

}
