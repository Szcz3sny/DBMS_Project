package bazydanych.service.dto

import bazydanych.model.Orders
import bazydanych.model.OrdersId

data class OrdersView(
    val id: OrdersId,
    val user: UserView,
    val partsId: String,
    val status: String,
)

fun Orders.toDto(user: UserView) = OrdersView(
    id = id,
    user = user,
    partsId = partsId,
    status = status,
)
