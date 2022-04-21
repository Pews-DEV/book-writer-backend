function getEnv(variable: string, defaultValue: string | number) {
   return process.env[variable] || defaultValue
}

export = {
   "type": "postgres",
   "host": getEnv("DB_HOST", "localhost"),
   "port": getEnv("DB_PORT", 5432),
   "username": getEnv("DB_USER", "postgres"),
   "password": getEnv("DB_PASSWD", "1234"),
   "database": getEnv("DB_NAME", "book"),
   "synchronize": true,
   "logging": false,
   "entities": [
      "app/**/entities/*.ts"
   ],
   
   "subscribers": [
      "app/src/database/subscriber/**/*.ts"
   ],
   "migrations": [
      "app/src/migrations/*.ts"
   ],
   "cli": {
      "entitiesDir": "app/src/entities",
      "migrationsDir": "app/src/migrations",
      "subscribersDir": "app/src/database/subscriber"
   }
}
