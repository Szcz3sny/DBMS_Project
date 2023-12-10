package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object RepairsTable {

    val TABLE = DSL.table("repairs")

    val ID = DSL.field(DSL.name(TABLE.name, "id"), SQLDataType.INTEGER)
    val VEHICLE_ID = DSL.field("vehicle_id", SQLDataType.INTEGER)
    val DESCRIPTION = DSL.field("description", SQLDataType.VARCHAR(255))
    val STATUS = DSL.field("status", SQLDataType.VARCHAR(32))
    val PRICE = DSL.field("price", SQLDataType.NUMERIC(6, 2))
}