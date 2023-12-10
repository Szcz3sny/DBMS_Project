package bazydanych.module

import bazydanych.model.OrdersId
import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.OrdersService
import bazydanych.service.form.OrdersCreateForm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Application.ordersModule(ordersService: OrdersService) {
    routing {
        route("/v1/orders") {
            authenticate {
                post {
                    val ordersCreateForm = call.receive<OrdersCreateForm>()
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.ADMIN) {
                        val createdOrders = ordersService.createOrders(principal.user, ordersCreateForm)
                        call.respond(
                            OrdersAddResponse(
                                createdOrders.id
                            )
                        )
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
                        if (ordersService.deleteOrders(OrdersId(id))) {
                            call.respond(HttpStatusCode.OK)
                        } else {
                            call.respond(HttpStatusCode.NotFound)
                        }
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

                put("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@put
                    }

                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.ADMIN) {
                        val ordersCreateForm = call.receive<OrdersCreateForm>()
                        val updatedOrders = ordersService.updateOrders(OrdersId(id), ordersCreateForm)
                        if (updatedOrders != null) {
                            call.respond(
                                OrdersAddResponse(
                                    updatedOrders.id
                                )
                            )
                        }
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

            }

            get {
                call.respond(ordersService.findAllOrders())
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull() ?: run {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }

                ordersService.findOrdersById(OrdersId(id))?.let { ordersView ->
                    call.respond(ordersView)
                } ?: call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}

@Serializable
data class OrdersAddResponse(
    val id: OrdersId
)
