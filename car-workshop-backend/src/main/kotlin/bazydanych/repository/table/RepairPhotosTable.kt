package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object RepairPhotosTable {

    val TABLE = DSL.table("repair_photos")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val REPAIR_ID = DSL.field("repair_id", SQLDataType.INTEGER)
    val PHOTO_URL = DSL.field("photo_url", SQLDataType.VARCHAR(128))
}