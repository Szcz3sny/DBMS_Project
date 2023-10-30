package bazydanych.module

import bazydanych.service.UserService
import io.ktor.server.application.*
import io.ktor.server.routing.*

fun Application.userModule(userService: UserService) {
    routing {
        route("/v1/user") {

        }
    }
}