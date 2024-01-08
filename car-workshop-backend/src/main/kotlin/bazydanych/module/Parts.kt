package bazydanych.module

import bazydanych.model.parts.PartsId
import bazydanych.model.user.UserRole
import bazydanych.service.PartsService
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.form.PartsCreateForm
import bazydanych.util.InvalidFileFormatException
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Application.partsModule(
    partsService: PartsService
) {
    routing {
        route("/v1/parts") {
            authenticate {
                post {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@post
                    }

                    val form = call.receive<PartsCreateForm>()
                    val parts = partsService.createParts(form)
                    call.respond(PartsAddResponse(parts.id))
                }

                post("/{partsId}/photos") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val partsId = call.parameters["partsId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@post
                    }

                    val partData: PartData.FileItem
                    try {
                        partData = call.receiveImageFile("photo")
                    } catch (e: BadRequestException) {
                        call.respond(HttpStatusCode.BadRequest, e.message ?: "Invalid file format")
                        return@post
                    }

                    try {
                        val id = partsService.updateImage(PartsId(partsId), partData.streamProvider().buffered())
                        call.respond(id)
                    } catch (e: InvalidFileFormatException) {
                        call.respond(HttpStatusCode.BadRequest, e.message ?: "Invalid file format")
                        return@post
                    }
                }



                get("/{partsId}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val partsId = call.parameters["partsId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val parts = partsService.findPartsById(PartsId(partsId))
                    if (parts != null) {
                        call.respond(parts)
                    } else {
                        call.respond(HttpStatusCode.NotFound)
                    }
                }
            }
        }
    }
}

@Serializable
class PartsAddResponse(val id: PartsId)