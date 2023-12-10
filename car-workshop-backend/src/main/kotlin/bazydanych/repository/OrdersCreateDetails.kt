package bazydanych.repository

import bazydanych.model.user.UserId

data class OrdersCreateDetails(
    val ownerId: UserId,
    val Id_Parts: Int,
    val Status: String,
)