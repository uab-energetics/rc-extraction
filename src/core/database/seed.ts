declare let Object: any

export const seedDatabase = async ({ config, dbConn, clearTables, database }) => {
    let ops = Object.entries(database).map(async ([table, rows]) => {
        let repo = dbConn.getRepository(table)
        if(clearTables) await repo.clear()
        await repo.save(rows)
    })
    await Promise.all(ops)
    await dbConn.close()
}
