package bazydanych.service.dto

import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import kotlinx.serialization.Serializable

@Serializable
data class UserView(
    val id: UserId,
    val name: String,
    val surname: String,
    val phoneNumber: String,
    val role: UserRole,
)

fun User.toDto() = UserView(
    id = id,
    name = name,
    surname = surname,
    phoneNumber = phoneNumber,
    role = role,
)