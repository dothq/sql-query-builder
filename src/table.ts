import { SQLBuilder, SQLTableSchemaType } from ".";
import { SQLBase } from "./base";
import { SQLSelector } from "./selector";

export class SQLTable extends SQLBase {
    private table: string;
    public parent: SQLBuilder;

    public constructor({ table, parent, isNew, schema }: { table: string, parent: SQLBuilder, isNew?: boolean, schema?: Record<string, SQLTableSchemaType[]> }) {
        super();

        this.table = table;
        this.parent = parent;

        if(isNew) {
            this.parent._data.push({ 
                keyword: "CREATE TABLE", 
                sql: [
                    `CREATE TABLE ${table}`,
                    ...(schema
                        ? [
                            " (",
                            ...Object.entries(schema)
                                .map(([key, value]) => `${key} ${value.join(" ")}`)
                                .join(", "),
                            ")",
                        ]
                        : [])
                ].join("")
            })
        }
    }

    public select(what: string[] | '*') {
        let selector = Array.isArray(what) ? what.join(", ") : what;

        this.parent._data.push({ keyword: "SELECT", sql: `SELECT ${selector} FROM ${this.table}` })

        return new SQLSelector(this);
    }
}