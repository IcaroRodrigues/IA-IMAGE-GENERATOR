import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1755444307875 implements MigrationInterface {
  name = 'InitialSchema1755444307875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`image\` (\`id\` varchar(36) NOT NULL, \`imageUrl\` varchar(255) NOT NULL, \`downloadUrl\` varchar(255) NOT NULL, \`promptDetails\` varchar(255) NOT NULL, \`negativePrompt\` varchar(255) NOT NULL, \`inputResolution\` varchar(255) NOT NULL, \`seed\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`creatorId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`image_liked_by_users\` (\`imageId\` varchar(36) NOT NULL, \`usersId\` varchar(36) NOT NULL, INDEX \`IDX_1684411ca85ebee6f999dc5a82\` (\`imageId\`), INDEX \`IDX_3a4438d655fd43108ca9005e75\` (\`usersId\`), PRIMARY KEY (\`imageId\`, \`usersId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` ADD CONSTRAINT \`FK_59c5368401a882919267f8616ce\` FOREIGN KEY (\`creatorId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_liked_by_users\` ADD CONSTRAINT \`FK_1684411ca85ebee6f999dc5a828\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_liked_by_users\` ADD CONSTRAINT \`FK_3a4438d655fd43108ca9005e757\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`image_liked_by_users\` DROP FOREIGN KEY \`FK_3a4438d655fd43108ca9005e757\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image_liked_by_users\` DROP FOREIGN KEY \`FK_1684411ca85ebee6f999dc5a828\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`image\` DROP FOREIGN KEY \`FK_59c5368401a882919267f8616ce\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3a4438d655fd43108ca9005e75\` ON \`image_liked_by_users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1684411ca85ebee6f999dc5a82\` ON \`image_liked_by_users\``,
    );
    await queryRunner.query(`DROP TABLE \`image_liked_by_users\``);
    await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`image\``);
  }
}
