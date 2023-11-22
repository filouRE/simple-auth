import postgres from "postgres";

const dbLogin: any = Bun.env.DATABASE_URL;
const sql = postgres(dbLogin);

export default sql;
