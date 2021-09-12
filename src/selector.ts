import { format } from "sqlstring";
import { SQLBase } from "./base";
import { SQLTable } from "./table";

export class SQLSelector extends SQLBase {
    private parent: SQLTable;

    public constructor(parent: SQLTable) {
        super();

        this.parent = parent;
    }

    public where(data: Record<string, any>) {
        let substitution = Object.entries(data).map(([key, value]) => {
            return `${key} = ?`
        }).join(" AND ");

        this.parent.parent._data.push({
            keyword: 'WHERE',
            sql: format(`WHERE ${substitution}`, [Object.values(data)])
        });

        return this.parent;
    }
}