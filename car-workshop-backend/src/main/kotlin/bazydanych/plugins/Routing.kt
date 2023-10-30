package bazydanych.plugins

import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import io.ktor.server.application.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        get("/") {
            call.respond(
                User(
                    id = UserId(1),
                    name = "John",
                    surname = "Doe",
                    phoneNumber = "123456789",
                    login = "johndoe",
                    password = "password",
                    role = UserRole.ADMIN
                )
            )
        }
    }
}
