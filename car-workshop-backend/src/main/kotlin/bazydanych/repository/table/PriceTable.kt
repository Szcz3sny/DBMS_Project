package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object PricesTable {

    val TABLE = DSL.table("prices")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val NAME = DSL.field("name", SQLDataType.VARCHAR(64))
    val DESCRIPTION = DSL.field("description", SQLDataType.VARCHAR(64))
    val PRICE = DSL.field("price", SQLDataType.NUMERIC)

}