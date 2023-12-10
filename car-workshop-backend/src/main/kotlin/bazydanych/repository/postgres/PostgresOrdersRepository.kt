package bazydanych.repository.postgres

import bazydanych.model.user.UserId
import bazydanych.model.Orders
import bazydanych.model.OrdersId
import bazydanych.repository.OrdersCreateDetails
import bazydanych.repository.OrdersRepository
import bazydanych.repository.table.OrdersTable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.Record

abstract class PostgresOrdersRepository(private val jooq: DSLContext) : OrdersRepository {
    override suspend fun findOrdersById(id: OrdersId): Orders? = withContext(Dispatchers.IO) {
        jooq.selectFrom(OrdersTable.TABLE.where(OrdersTable.ID.eq(id.value))).fetchOne { parse(it) }
    }

    override suspend fun findOrdersByUserId(userId: UserId): List<Orders> = withContext(Dispatchers.IO) {
        jooq.selectFrom(OrdersTable.TABLE.where(OrdersTable.USER_ID.eq(userId.value))).fetch { parse(it) }
    }

    override suspend fun insert(orders: OrdersCreateDetails): OrdersId = withContext(Dispatchers.IO) {
        jooq.insertInto(OrdersTable.TABLE)
            .columns(
                OrdersTable.USER_ID,
                OrdersTable.PARTS_ID,
                OrdersTable.STATUS
            ).values(
                orders.userId.value,
                orders.partsId,
                orders.status
            ).returning(OrdersTable.ID).fetchOne()?.let {
                val id = it.getValue(OrdersTable.ID) ?: throw IllegalStateException("No orders id returned")
                OrdersId(id)
            } ?: throw IllegalStateException("No orders id returned")
    }

    override suspend fun delete(id: OrdersId): Boolean = withContext(Dispatchers.IO) {
        jooq.deleteFrom(OrdersTable.TABLE).where(OrdersTable.ID.eq(id.value)).execute() > 0
    }

    private fun parse(it: Record): Orders = Orders(  // Change the class name here
        id = OrdersId(it.getValue(OrdersTable.ID)),
        userId = UserId(it.getValue(OrdersTable.USER_ID)),
        partsId = it.getValue(OrdersTable.PARTS_ID),
        status = it.getValue(OrdersTable.STATUS)
    )
}
