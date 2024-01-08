package bazydanych.service.dto

import bazydanych.model.Orders
import bazydanych.model.OrdersId
import kotlinx.serialization.Serializable
@Serializable
data class OrdersView(
    val id: OrdersId,
    val status: String,
)

fun Orders.toDto() = OrdersView(
    id = id,
    status = status,
)