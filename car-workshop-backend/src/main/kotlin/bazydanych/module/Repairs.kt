package bazydanych.module

import bazydanych.model.repair.RepairId
import bazydanych.model.repair.RepairPhotoId
import bazydanych.model.user.UserRole
import bazydanych.model.VehicleId
import bazydanych.model.repair.RepairStatus
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.RepairsService
import bazydanych.service.form.RepairCreateForm
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

fun Application.repairsModule(
    repairsService: RepairsService,
) {
    routing {
        route("/v1/repairs") {
            authenticate {
                post {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@post
                    }

                    val form = call.receive<RepairCreateForm>()
                    val repairId = repairsService.addRepair(form)
                    call.respond(RepairAddResponse(repairId))
                }

                post("/{repairId}/photos") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val repairId = call.parameters["repairId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@post
                    }

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
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
                        val id = repairsService.addRepairPhoto(RepairId(repairId), partData.streamProvider().buffered())
                        call.respond(id)
                    } catch (e: InvalidFileFormatException) {
                        call.respond(HttpStatusCode.BadRequest, e.message ?: "Invalid file format")
                        return@post
                    }
                }


                post("/{repairId}/status") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val repairId = call.parameters["repairId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@post
                    }

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@post
                    }

                    val status = call.receive<RepairStatusUpdate>()
                    val success = repairsService.updateRepairStatus(RepairId(repairId), status.status)
                    if (success) {
                        call.respond(HttpStatusCode.OK)
                    } else {
                        call.respond(HttpStatusCode.NotFound, "Repair not found")
                    }
                }

                get("/{vehicleId}/repair-status") {
                    val vehicleId = call.parameters["vehicleId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val repairStatus = repairsService.getRepairStatusByVehicleId(VehicleId(vehicleId)) ?: run {
                        call.respond(HttpStatusCode.NotFound, "Repair status not found")
                        return@get
                    }

                    call.respond(mapOf("repairStatus" to repairStatus))
                }
                get("/{repairId}/photos") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val repairId = call.parameters["repairId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val vehicleOwner = repairsService.findVehicleOwnerByRepairId(RepairId(repairId))

                    if (principal.user.role == UserRole.GUEST && (vehicleOwner == null || principal.user.id != vehicleOwner)) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@get
                    }

                    call.respond(repairsService.findRepairPhotosIdsByRepairId(RepairId(repairId)))
                }

                get {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val repairs = repairsService.findAllRepairs()
                    call.respond(repairs)
                }

                get("/{vehicleId}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val vehicleId = call.parameters["vehicleId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val repairs = repairsService.findAllRepairsByVehicleId(VehicleId(vehicleId))
                    call.respond(repairs)
                }

                delete("/{repairId}/photos/{photoId}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val repairId = call.parameters["repairId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@delete
                    }

                    val photoId = call.parameters["photoId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@delete
                    }

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@delete
                    }

                    val success = repairsService.deleteRepairPhoto(RepairPhotoId(photoId))
                    if (success) {
                        call.respond(HttpStatusCode.OK)
                    } else {
                        call.respond(HttpStatusCode.NotFound, "Repair photo not found")
                    }
                }

                delete("/{repairId}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val repairId = call.parameters["repairId"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@delete
                    }

                    val success = repairsService.deleteRepair(RepairId(repairId))
                    if (success) {
                        call.respond(HttpStatusCode.OK, "Repair deleted successfully")
                    } else {
                        call.respond(HttpStatusCode.NotFound, "Repair not found")
                    }
                }



            }
        }
    }
}

@Serializable
class RepairAddResponse(val id: RepairId)

@Serializable
class RepairStatusUpdate(val status: RepairStatus)