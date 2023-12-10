package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType
import java.time.LocalDateTime

object CalendarsTable {
    val TABLE = DSL.table("calendar")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val ID_VEHICLE = DSL.field("vehicle_id", SQLDataType.INTEGER)
    val ID_USER = DSL.field("user_id", SQLDataType.INTEGER)
    val DATETIME = DSL.field("datetime", SQLDataType.LOCALDATETIME)
    val DEFECT = DSL.field("defect", SQLDataType.VARCHAR(64))
    val STATUS = DSL.field("status", SQLDataType.VARCHAR(16))
}