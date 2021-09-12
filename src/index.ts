import { SQLBase } from "./base";
import { SQLTable } from "./table";

interface SQLParsedItem {
    keyword: 'SELECT' | 'WHERE' | 'SELECT-WHERE' | 'CREATE TABLE',
    sql: string
}

export type SQLTableSchemaType = 'TEXT' | 'NOT NULL' | 'INT' | 'REAL' | `CHAR(${number})`;

export class SQLBuilder extends SQLBase {
    public _data: SQLParsedItem[] = [];

    public table(name: string) {
        return new SQLTable({ table: name, parent: this });
    }

    public createTable(name: string, schema: Record<string, SQLTableSchemaType[]>) {
        return new SQLTable({
            table: name,
            parent: this,
            isNew: true,
            schema
        });
    }

    public constructor() {
        super();
    }
}

const query = new SQLBuilder()
    .createTable("testing", {
        id: ["TEXT"]
    })
    .select("*")
    .where({
        id: "bingus"
    });

const query2 = new SQLBuilder()
    .table("testing")
    .select(["id", "name"])

const query3 = new SQLBuilder()
    .createTable("bookmarks", {
        id: ["TEXT"],
        title: ["TEXT"],
        url: ["TEXT"],
        date_created: ["INT"],
        last_updated: ["INT"],
        parent_id: ["TEXT", "NOT NULL"]
    })
    .select("*")
    .where({
        date_created: {}
    })

console.log(query.toSQL())
console.log(query2.toSQL())
console.log(query3.toSQL())