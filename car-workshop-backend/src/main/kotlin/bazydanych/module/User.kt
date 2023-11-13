package bazydanych.module

import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.UserService
import bazydanych.service.form.UserCreateForm
import bazydanych.service.form.UserLoginForm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.userModule(userService: UserService) {
    routing {
        route("/v1/user") {
            authenticate {
                put("/create") {
                    val userCreateForm = call.receive<UserCreateForm>()
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.ADMIN) {
                        val userAndCredentials = userService.createUser(userCreateForm)
                        val credentials = userAndCredentials.second
                        call.respond(
                            mapOf(
                                "login" to credentials.first,
                                "password" to credentials.second
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
                        val newUser = userService.deleteUser(UserId(id))
                        call.respond(newUser)
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
                        userService.findUserById(UserId(id))?.let { userView ->
                            call.respond(userView)
                        } ?: call.respond(HttpStatusCode.NotFound)
                    }
                }
            }

            post("/login") {
                val loginForm = call.receive<UserLoginForm>()
                userService.login(loginForm)?.let { result ->
                    call.respond(mapOf("token" to result.second))
                } ?: call.respond(HttpStatusCode.Unauthorized)
            }
        }
    }
}