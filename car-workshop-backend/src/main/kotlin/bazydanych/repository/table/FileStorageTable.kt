package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object FileStorageTable {

    val TABLE = DSL.table("file_storage")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val TYPE = DSL.field("type", SQLDataType.VARCHAR(32))
    val DATA = DSL.field("data", SQLDataType.BLOB)
    val VIEW_TOKEN = DSL.field("view_token", SQLDataType.VARCHAR(48))
}