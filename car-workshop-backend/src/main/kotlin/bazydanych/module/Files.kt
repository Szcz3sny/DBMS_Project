package bazydanych.module

import bazydanych.service.BaseFileStorageService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.imagesModule(fileStorageService: BaseFileStorageService) {
    routing {
        route("/v1/images") {
            get("/{viewToken}") {
                val viewToken = call.parameters["viewToken"] ?: run {
                    call.respond(HttpStatusCode.BadRequest)
                    return@get
                }

                val file = fileStorageService.loadFile(viewToken)
                if (file != null) {
                    call.respondBytes(file.data, ContentType.parse(file.type))
                } else {
                    call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }
}