package bazydanych.service

import bazydanych.model.OrdersId
import bazydanych.model.user.User
import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import bazydanych.repository.OrdersCreateDetails
import bazydanych.repository.OrdersRepository
import bazydanych.service.dto.OrdersView
import bazydanych.service.dto.toDto
import bazydanych.service.form.OrdersCreateForm
import bazydanych.model.user.UserId

class OrdersService(
    private val ordersRepository: OrdersRepository,
    private val partsService: PartsService,
) {

    suspend fun findOrdersById(id: OrdersId): OrdersView? {
        val order = ordersRepository.findOrdersById(id) ?: return null
        val customer = partsService.findPartsById(PartsId(order.Id_Parts)) ?: return null
        return order.toDto()
    }

    suspend fun addOrders(owner: User, createForm: OrdersCreateForm): OrdersId {
        val orderDetails = OrdersCreateDetails(
            ownerId = owner.id,
            Id_Parts = createForm.Id_Parts,
            Status = createForm.Status
        )
        return ordersRepository.insert(orderDetails)
    }

    suspend fun findOrdersByOwner(customer: User): List<OrdersView> {
        val orders = ordersRepository.findOrdersByOwnerId(UserId(customer.id.value))
        return orders.map { it.toDto() }
    }

    suspend fun createOrder(customer: Parts, form: OrdersCreateForm): OrdersId {
        val details = OrdersCreateDetails(
            ownerId = UserId(customer.id.value),
            Id_Parts = form.Id_Parts,
            Status = form.Status
        )

        return ordersRepository.insert(details)
    }

    suspend fun deleteOrder(id: OrdersId): Boolean {
        return ordersRepository.delete(id)
    }
}