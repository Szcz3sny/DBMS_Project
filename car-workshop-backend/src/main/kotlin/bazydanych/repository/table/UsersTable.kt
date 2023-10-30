package bazydanych.repository.table

import org.jooq.impl.DSL
import org.jooq.impl.SQLDataType

object UsersTable {

    val TABLE = DSL.table("users")

    val ID = DSL.field("id", SQLDataType.INTEGER)
    val NAME = DSL.field("name", SQLDataType.VARCHAR(64))
    val SURNAME = DSL.field("surname", SQLDataType.VARCHAR(64))
    val PHONE_NUMBER = DSL.field("phone_number", SQLDataType.VARCHAR(16))
    val LOGIN = DSL.field("login", SQLDataType.VARCHAR(64))
    val PASSWORD = DSL.field("password", SQLDataType.VARCHAR(256))
    val ROLE = DSL.field("role", SQLDataType.VARCHAR(16))
}