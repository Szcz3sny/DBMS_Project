package bazydanych.repository.postgres

import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import bazydanych.service.UserCreateDetails
import bazydanych.repository.UserRepository
import bazydanych.repository.table.UsersTable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.Record

class PostgresUserRepository(private val jooq: DSLContext) : UserRepository {

    override suspend fun findUserById(id: UserId): User? = withContext(Dispatchers.IO) {
        jooq.selectFrom(UsersTable.TABLE.where(UsersTable.ID.eq(id.value))).fetchOne { parse(it) }
    }

    override suspend fun findUserByLogin(login: String): User? = withContext(Dispatchers.IO) {
        jooq.selectFrom(UsersTable.TABLE.where(UsersTable.LOGIN.eq(login))).fetchOne { parse(it) }
    }

    override suspend fun findAllNamesWithIds(): List<Pair<UserId, String>> = withContext(Dispatchers.IO) {
        jooq.select(UsersTable.ID, UsersTable.NAME, UsersTable.SURNAME).from(UsersTable.TABLE).fetch {
            UserId(it.getValue(UsersTable.ID)) to
                    "${it.getValue(UsersTable.NAME)} ${it.getValue(UsersTable.SURNAME)}"
        }
    }

    override suspend fun existsByLogin(login: String): Boolean = withContext(Dispatchers.IO) {
        jooq.fetchExists(UsersTable.TABLE.where(UsersTable.LOGIN.eq(login)))
    }

    override suspend fun insert(details: UserCreateDetails): User = withContext(Dispatchers.IO) {
        jooq.insertInto(UsersTable.TABLE)
            .columns(
                UsersTable.NAME,
                UsersTable.SURNAME,
                UsersTable.PHONE_NUMBER,
                UsersTable.LOGIN,
                UsersTable.PASSWORD,
                UsersTable.ROLE
            ).values(
                details.name,
                details.surname,
                details.phoneNumber,
                details.login,
                details.password,
                details.role.name
            ).returning(UsersTable.ID).fetchOne().let {
                val id = it?.getValue(UsersTable.ID) ?: throw IllegalStateException("No user id returned")
                User(
                    id = UserId(id),
                    name = details.name,
                    surname = details.surname,
                    phoneNumber = details.phoneNumber,
                    login = details.login,
                    password = details.password,
                    role = details.role
                )
            }
    }

    override suspend fun delete(id: UserId) = withContext(Dispatchers.IO) {
        jooq.deleteFrom(UsersTable.TABLE).where(UsersTable.ID.eq(id.value)).execute() > 0
    }

    private fun parse(it: Record): User {
        return User(
            id = UserId(it.getValue(UsersTable.ID)),
            name = it.getValue(UsersTable.NAME),
            surname = it.getValue(UsersTable.SURNAME),
            phoneNumber = it.getValue(UsersTable.PHONE_NUMBER),
            login = it.getValue(UsersTable.LOGIN),
            password = it.getValue(UsersTable.PASSWORD),
            role = UserRole.valueOf(it.getValue(UsersTable.ROLE))
        )
    }
}