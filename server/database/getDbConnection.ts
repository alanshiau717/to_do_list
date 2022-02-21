import { Connection, createConnection, getConnection } from "typeorm";

export const getDbConnection = async (): Promise<Connection> => {
  try {
    return getConnection()
    // return getConnection("defaultdb");
  } catch {
    return await createConnection();
    // return await createConnection("defaultdb");
  }
};
