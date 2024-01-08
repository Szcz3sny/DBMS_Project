package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object OrdersTable {

    val TABLE = DSL.table("orders")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val USER_ID = DSL.field("user_id", SQLDataType.INTEGER)
    val PART_ID = DSL.field("part_id", SQLDataType.INTEGER)
    val STATUS = DSL.field("status", SQLDataType.VARCHAR(64))
}