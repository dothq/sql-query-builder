export const toSQL = ({ parent, pretty }: { parent: any, pretty?: boolean }) => {
    let data = parent._data;

    data.forEach((curr, currIndex) => {
        const next = data[currIndex + 1];

        if((curr && next) && (curr.keyword == "SELECT" && next.keyword == "WHERE")) {
            data[currIndex] = null;

            data[currIndex + 1] = {
                keyword: "SELECT-WHERE",
                sql: `${curr.sql} ${next.sql}`
            }
        }
    })

    data = data.filter(x => !(typeof(x) == "undefined" || x == null));

    if(!data.length) return undefined;
    return data.map(x => x.sql).join(`;${pretty ? `\n` : ` `}`)
}