package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType
import java.math.BigDecimal

object PartsTable {

    val TABLE = DSL.table("parts")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val VEHICLE_ID = DSL.field("vehicle_id", SQLDataType.INTEGER)
    val PRODUCT_NAME = DSL.field("product_name", SQLDataType.VARCHAR(64))
    val PRICE = DSL.field("price", SQLDataType.NUMERIC)
    val IMAGE = DSL.field("image", SQLDataType.VARCHAR(128))
}