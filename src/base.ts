import { toSQL } from "./util/toSQL";

export class SQLBase {
    public toSQL(args?: { pretty?: boolean }) {
        let currentParent = (this as any).parent;

        while(typeof(currentParent.parent) !== "undefined") {
            currentParent = currentParent.parent;
        }

        return toSQL({ parent: currentParent, ...args })
    }
}