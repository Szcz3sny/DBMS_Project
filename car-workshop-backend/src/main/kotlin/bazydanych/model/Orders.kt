package bazydanych.model

import bazydanych.model.user.UserId
import kotlinx.serialization.Serializable

typealias OrdersId = Id<Orders>

@Serializable
data class Orders(
    val id: OrdersId,
    val userId: UserId,
    val partsId: String,
    val status: String
)
