package bazydanych.service

import bazydanych.model.user.UserRole

data class UserCreateDetails(
    val name: String,
    val surname: String,
    val phoneNumber: String,
    val login: String,
    val password: String,
    val role: UserRole
)