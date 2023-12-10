package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object OrdersTable {

    val TABLE = DSL.table("orders")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val USER_ID = DSL.field("user_id", SQLDataType.INTEGER.nullable(false))
    val PARTS_ID = DSL.field("parts_id", SQLDataType.VARCHAR(64).nullable(false))
    val STATUS = DSL.field("status", SQLDataType.VARCHAR(16).nullable(false))
}
