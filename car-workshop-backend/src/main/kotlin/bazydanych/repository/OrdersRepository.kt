package bazydanych.repository

import bazydanych.model.Orders
import bazydanych.model.OrdersId
import bazydanych.model.parts.Parts
import bazydanych.model.price.Price
import bazydanych.model.user.UserId
import bazydanych.service.PriceCreateDetails

interface OrdersRepository {

    suspend fun findOrdersById(id: OrdersId): Orders?

    suspend fun findOrdersByUserId(userId: UserId): List<Orders>

    suspend fun insert(orders: OrdersCreateDetails): OrdersId

    suspend fun delete(id: OrdersId): Boolean

    suspend fun findAllOrders(): List<Orders>

    suspend fun updateOrders(id: OrdersId, details: OrdersCreateDetails): Orders?
    }
