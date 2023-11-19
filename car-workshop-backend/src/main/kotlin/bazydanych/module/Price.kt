package bazydanych.module

import bazydanych.model.price.PriceId
import bazydanych.model.user.UserRole
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.PriceService
import bazydanych.service.form.PriceCreateForm
import bazydanych.util.BigDecimalSerializer
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.math.BigDecimal

fun Application.priceModule(priceService: PriceService) {
    routing {
        route("/v1/price") {
            authenticate {
                post {
                    val priceCreateForm = call.receive<PriceCreateForm>()
                    val principal: JWTUserPrincipal = call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.ADMIN) {
                        val createdPrice = priceService.createPrice(priceCreateForm)
                        call.respond(
                            PriceCreationResponse(
                                createdPrice.id,
                                createdPrice.name,
                                createdPrice.description,
                                createdPrice.price
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
                        if (priceService.deletePrice(PriceId(id))) {
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
                        val priceCreateForm = call.receive<PriceCreateForm>()
                        val updatedPrice = priceService.updatePrice(PriceId(id), priceCreateForm)
                        call.respond(PriceCreationResponse(updatedPrice.id, updatedPrice.name, updatedPrice.description, updatedPrice.price))
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

                get("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                    } else {
                        priceService.findPriceById(PriceId(id))?.let { priceView ->
                            call.respond(priceView)
                        } ?: call.respond(HttpStatusCode.NotFound)
                    }
                }
            }
        }
    }
}

@Serializable
data class PriceCreationResponse(
    val id: PriceId,
    val name: String,
    val description: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal
)