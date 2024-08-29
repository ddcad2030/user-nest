import { User } from 'src/users/entities/user.entity';
import { Report } from 'src/reports/entities/report.entity';
import { DataSource } from 'typeorm';

export const dataProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_HOST_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Report, User],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
