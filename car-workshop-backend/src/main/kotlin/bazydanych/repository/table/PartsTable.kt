package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object PartsTable {

    val TABLE = DSL.table("parts")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val NAME = DSL.field("name", SQLDataType.VARCHAR(64))
    val PRICE = DSL.field("price", SQLDataType.NUMERIC)
    // val IMAGE = DSL.field("image", SQLDataType.BLOB) prosze państwa, ja nie jestem w stanie, ja nie jestem w stanie zrobić tego, jestem skończony
    //poddałem sie bo szef mi tak powiedzial
}