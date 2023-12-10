package bazydanych.module

import bazydanych.model.parts.PartsId
import bazydanych.model.user.UserRole
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.PartsService
import bazydanych.service.form.PartsCreateForm
import bazydanych.util.BigDecimalSerializer
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable
import java.math.BigDecimal

fun Application.partsModule(partsService: PartsService) {
    routing {
        route("/v1/parts") {
            authenticate {
                post {
                    val partsCreateForm = call.receive<PartsCreateForm>()
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.ADMIN) {
                        val createdParts = partsService.createParts(partsCreateForm)
                        call.respond(
                            PartsCreationResponse(
                                createdParts.id,
                                createdParts.name,
                                createdParts.price,
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
                        if (partsService.deleteParts(PartsId(id))) {
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
                        val partsCreateForm = call.receive<PartsCreateForm>()  // Fix variable name here
                        val updatedParts = partsService.updateParts(PartsId(id), partsCreateForm)
                        call.respond(
                            PartsCreationResponse(
                                updatedParts.id,
                                updatedParts.name,
                                updatedParts.price,
                            )
                        )
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

            }

            get {
                call.respond(partsService.findAllParts())
            }

            get("/{id}") {
                val id = call.parameters["id"]?.toIntOrNull() ?: run {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }

                partsService.findPartsById(PartsId(id))?.let { partsView ->
                    call.respond(partsView)
                } ?: call.respond(HttpStatusCode.NotFound)
            }
        }
    }
}

@Serializable
data class PartsCreationResponse(
    val id: PartsId,
    val name: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
)
