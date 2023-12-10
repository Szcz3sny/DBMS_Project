package bazydanych.service

import bazydanych.model.OrdersId
import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.repository.OrdersCreateDetails
import bazydanych.repository.OrdersRepository
import bazydanych.service.dto.OrdersView
import bazydanych.service.dto.toDto
import bazydanych.service.form.OrdersCreateForm

class OrdersService(
    private val ordersRepository: OrdersRepository,
    private val userService: UserService,
) {

    suspend fun findOrdersById(id: OrdersId): OrdersView? {
        val orders = ordersRepository.findOrdersById(id) ?: return null
        val user = userService.findUserById(orders.userId) ?: return null
        return orders.toDto(user.toDto())
    }

    suspend fun findOrdersByUser(user: User): List<OrdersView> {
        val orders = ordersRepository.findOrdersByUserId(user.id) ?: return emptyList()
        return orders.map { it.toDto(user.toDto()) }
    }

    suspend fun findAllOrders(): List<OrdersView> {
        val orders = ordersRepository.findAllOrders()
        return orders.map { it.toDto(userService.findUserById(it.userId)!!.toDto()) }
    }

    suspend fun createOrders(user: User, form: OrdersCreateForm): OrdersId {
        val details = OrdersCreateDetails(
            userId = user.id,
            partsId = form.partsId,
            status = form.status,
        )

        return ordersRepository.insert(details)
    }

    suspend fun updateOrders(id: OrdersId, form: OrdersCreateForm): OrdersView? {
        val details = OrdersCreateDetails(
            userId = UserId(id.value),
            partsId = form.partsId,
            status = form.status,
        )

        val orders = ordersRepository.updateOrders(id, details) ?: return null
        val user = userService.findUserById(orders.userId) ?: return null
        return orders.toDto(user.toDto())
    }



    suspend fun deleteOrders(id: OrdersId): Boolean {
        return ordersRepository.delete(id)
    }
}
