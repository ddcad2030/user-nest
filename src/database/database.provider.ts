import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const dataProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 9920,
        username: 'root',
        password: 'root',
        database: 'db_test',
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
