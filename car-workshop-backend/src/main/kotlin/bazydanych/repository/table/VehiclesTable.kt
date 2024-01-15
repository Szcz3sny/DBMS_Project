package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object VehiclesTable {

    val TABLE = DSL.table("vehicles")

    val ID = DSL.field(DSL.name(TABLE.name, "id"), SQLDataType.INTEGER)
    val OWNER_ID = DSL.field("owner_id", SQLDataType.INTEGER)
    val BRAND = DSL.field("brand", SQLDataType.VARCHAR(64))
    val MODEL = DSL.field("model", SQLDataType.VARCHAR(64))
    val YEAR_OF_PRODUCTION = DSL.field("year_of_production", SQLDataType.INTEGER)
    val VIN = DSL.field("vin", SQLDataType.VARCHAR(64))
    val LICENSE_PLATE = DSL.field("license_plate", SQLDataType.VARCHAR(16))
}