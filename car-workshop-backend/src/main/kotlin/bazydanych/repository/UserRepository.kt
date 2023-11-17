package bazydanych.repository

import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.service.UserCreateDetails

interface UserRepository {

    suspend fun findUserById(id: UserId): User?

    suspend fun findUserByLogin(login: String): User?

    suspend fun existsByLogin(login: String): Boolean

    suspend fun insert(details: UserCreateDetails): User

    suspend fun delete(id: UserId): Boolean
}