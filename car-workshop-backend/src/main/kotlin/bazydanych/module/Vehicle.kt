package bazydanych.module

import bazydanych.model.VehicleId
import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.UserService
import bazydanych.service.VehicleService
import bazydanych.service.form.VehicleCreateForm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

fun Application.vehicleModule(
    userService: UserService,
    vehicleService: VehicleService
) {
    routing {
        route("/v1/user/{userId}/vehicles") {
            authenticate {
                post {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val createForm = call.receive<VehicleCreateForm>()
                    val userId = call.parameters["userId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@post
                    }

                    val owner = userService.findUserById(UserId(userId)) ?: run {
                        call.respond(HttpStatusCode.NotFound, "User not found")
                        return@post
                    }

                    if (principal.user.role == UserRole.ADMIN) {
                        val vehicleId = vehicleService.addVehicle(owner, createForm)
                        call.respond(VehicleAddResponse(vehicleId))
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

                get {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val userId = call.parameters["userId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val owner = userService.findUserById(UserId(userId)) ?: run {
                        call.respond(HttpStatusCode.NotFound, "User not found")
                        return@get
                    }

                    if (principal.user.role == UserRole.ADMIN || principal.user.id == owner.id) {
                        call.respond(vehicleService.findVehiclesByOwner(owner))
                    } else {
                        call.respond(HttpStatusCode.Forbidden)
                    }
                }

                get("/{id}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val userId = call.parameters["userId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val owner = userService.findUserById(UserId(userId)) ?: run {
                        call.respond(HttpStatusCode.NotFound, "User not found")
                        return@get
                    }

                    if (principal.user.role == UserRole.ADMIN || principal.user.id == owner.id) {
                        val vehicleId = call.parameters["id"]?.toIntOrNull() ?: run {
                            call.respond(HttpStatusCode.BadRequest)
                            return@get
                        }

                        val vehicle = vehicleService.findVehicleById(VehicleId(vehicleId)) ?: run {
                            call.respond(HttpStatusCode.NotFound, "Vehicle not found")
                            return@get
                        }

                        call.respond(vehicle)
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
                        if (vehicleService.deleteVehicle(VehicleId(id))) {
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
class VehicleAddResponse(val id: VehicleId)