package bazydanych.repository

import bazydanych.model.user.UserId

data class OrdersCreateDetails(
    val userId: UserId,
    val partsId: String,
    val status: String,
)
