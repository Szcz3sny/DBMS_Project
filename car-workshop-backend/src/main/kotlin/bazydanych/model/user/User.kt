package bazydanych.model.user

import bazydanych.model.Id
import kotlinx.serialization.Serializable

typealias UserId = Id<User>

@Serializable
data class User(
    val id: UserId,
    val name: String,
    val surname: String,
    val phoneNumber: String,
    val login: String,
    val password: String,
    val role: UserRole
)