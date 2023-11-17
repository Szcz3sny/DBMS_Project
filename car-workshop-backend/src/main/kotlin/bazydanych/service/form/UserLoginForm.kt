package bazydanych.service.form

import kotlinx.serialization.Serializable

@Serializable
data class UserLoginForm(
    val login: String,
    val password: String,
    val remember: Boolean
)