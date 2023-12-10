package bazydanych.model

import bazydanych.model.user.UserId
import kotlinx.serialization.Serializable

typealias OrdersId = Id<Orders>

@Serializable
data class Orders(
    val id: OrdersId,
    val ownerId: UserId,
    val Id_Parts: Int,
    val Status: String,
)