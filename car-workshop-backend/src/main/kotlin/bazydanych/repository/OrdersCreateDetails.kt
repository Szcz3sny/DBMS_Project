package bazydanych.repository

import bazydanych.model.user.UserId

data class OrdersCreateDetails(
    val ownerId: UserId,
    val partsId: Int,
    val status: String,
)