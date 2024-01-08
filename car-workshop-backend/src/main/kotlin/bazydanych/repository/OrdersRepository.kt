package bazydanych.repository

import bazydanych.model.Orders
import bazydanych.model.OrdersId
import bazydanych.model.user.UserId

interface OrdersRepository {

    suspend fun findOrdersById(id: OrdersId): Orders?

    suspend fun findOrdersByOwnerId(ownerId: UserId): List<Orders>

    suspend fun insert(Orders: OrdersCreateDetails): OrdersId

    suspend fun delete(id: OrdersId): Boolean
}