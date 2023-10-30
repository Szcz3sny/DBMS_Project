package bazydanych.repository.postgres

import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.repository.UserRepository
import org.jooq.DSLContext

class PostgresUserRepository(private val jooq: DSLContext) : UserRepository {

    override suspend fun findUserById(id: UserId): User? {
        TODO("Not yet implemented")
    }
}