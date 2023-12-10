package bazydanych.repository.postgres

import bazydanych.model.Orders
import bazydanych.model.OrdersId
import bazydanych.model.user.UserId
import bazydanych.repository.OrdersCreateDetails
import bazydanych.repository.OrdersRepository
import bazydanych.repository.table.OrdersTable
import bazydanych.repository.table.VehiclesTable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.Record

class PostgresOrdersRepository(private val jooq: DSLContext) : OrdersRepository {
    override suspend fun findOrdersById(id: OrdersId): Orders? = withContext(Dispatchers.IO) {
        jooq.selectFrom(OrdersTable.TABLE.where(OrdersTable.ID.eq(id.value))).fetchOne { parse(it) }
        }

    override suspend fun findOrdersByOwnerId(ownerId: UserId): List<Orders> = withContext(Dispatchers.IO) {
        jooq.selectFrom(OrdersTable.TABLE.where(OrdersTable.USER_ID.eq(ownerId.value))).fetch { parse(it) }
    }

    override suspend fun insert(Orders: OrdersCreateDetails): OrdersId = withContext(Dispatchers.IO) {
        jooq.insertInto(OrdersTable.TABLE)
            .columns(
                OrdersTable.USER_ID,
                OrdersTable.PART_ID,
                OrdersTable.STATUS,
            ).values(
                Orders.ownerId.value,
                Orders.Id_Parts,
                Orders.Status

            ).returning(OrdersTable.ID).fetchOne()?.let {
                val id = it.getValue(OrdersTable.ID) ?: throw IllegalStateException("No Orders id returned")
                OrdersId(id)
            } ?: throw IllegalStateException("No Orders id returned")
    }

    override suspend fun delete(id: OrdersId): Boolean = withContext(Dispatchers.IO) {
        jooq.deleteFrom(OrdersTable.TABLE).where(OrdersTable.ID.eq(id.value)).execute() > 0
    }

    private fun parse(it: Record): Orders = Orders(
        id = OrdersId(it.getValue(OrdersTable.ID)),
        ownerId = UserId(it.getValue(OrdersTable.USER_ID)),
        Id_Parts = it.getValue(OrdersTable.PART_ID),
        Status = it.getValue(OrdersTable.STATUS),

    )
}