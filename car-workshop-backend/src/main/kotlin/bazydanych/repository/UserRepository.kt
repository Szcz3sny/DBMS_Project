package bazydanych.repository

import bazydanych.model.user.User
import bazydanych.model.user.UserId

interface UserRepository {

    suspend fun findUserById(id: UserId): User?
}