package bazydanych.module

import bazydanych.model.OrdersId
import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.UserService
import bazydanych.service.OrdersService
import bazydanych.service.form.OrdersCreateForm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Application.ordersModule(
    userService: UserService,
    ordersService: OrdersService
) {
    routing {
        route("/v1/user/{user-id}/orders") {
            authenticate {
                post {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val createForm = call.receive<OrdersCreateForm>()
                    val userId = call.parameters["user-id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@post
                    }

                    val owner = userService.findUserById(UserId(userId)) ?: run {
                        call.respond(HttpStatusCode.NotFound, "User not found")
                        return@post
                    }

                    if (principal.user.role == UserRole.ADMIN) {
                        val orderId = ordersService.addOrders(owner, createForm)
                        call.respond(OrderAddResponse(orderId))
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

                get {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val userId = call.parameters["user-id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val owner = userService.findUserById(UserId(userId)) ?: run {
                        call.respond(HttpStatusCode.NotFound, "User not found")
                        return@get
                    }

                    if (principal.user.role == UserRole.ADMIN || principal.user.id == owner.id) {
                        val orders = ordersService.findOrdersByOwner(owner)
                        call.respond(orders)
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

                get("/{id}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val userId = call.parameters["user-id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val owner = userService.findUserById(UserId(userId)) ?: run {
                        call.respond(HttpStatusCode.NotFound, "User not found")
                        return@get
                    }

                    if (principal.user.role == UserRole.ADMIN || principal.user.id == owner.id) {
                        val orderId = call.parameters["id"]?.toIntOrNull() ?: run {
                            call.respond(HttpStatusCode.BadRequest)
                            return@get
                        }

                        val order = ordersService.findOrdersById(OrdersId(orderId)) ?: run {
                            call.respond(HttpStatusCode.NotFound, "Order not found")
                            return@get
                        }

                        call.respond(order)
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

                delete("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@delete
                    }

                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.ADMIN) {
                        if (ordersService.deleteOrder(OrdersId(id))) {
                            call.respond(HttpStatusCode.OK)
                        } else {
                            call.respond(HttpStatusCode.NotFound)
                        }
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

            }
        }
    }
}

@Serializable
class OrderAddResponse(val id: OrdersId)