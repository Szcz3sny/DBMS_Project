package bazydanych.service.form

import bazydanych.model.user.UserRole
import kotlinx.serialization.Serializable

@Serializable
data class UserCreateForm(
    val name: String,
    val surname: String,
    val login: String,
    val phoneNumber: String,
    val role: UserRole
)