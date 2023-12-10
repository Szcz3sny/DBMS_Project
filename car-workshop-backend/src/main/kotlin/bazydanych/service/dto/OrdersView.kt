package bazydanych.service.dto

import bazydanych.model.Orders
import bazydanych.model.OrdersId
import kotlinx.serialization.Serializable
@Serializable
data class OrdersView(
    val id: OrdersId,
    val Status: String,
)

fun Orders.toDto() = OrdersView(
    id = id,
    Status = Status,
)