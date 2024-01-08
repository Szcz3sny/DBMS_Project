package bazydanych.module

import bazydanych.model.calendar.CalendarId
import bazydanych.model.user.UserRole
import bazydanych.plugins.JWTUserPrincipal
import bazydanych.service.CalendarService
import bazydanych.service.form.CalendarCreateForm
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.calendarModule(
    calendarService: CalendarService
) {
    routing {
        route("/v1/calendar") {
            authenticate {
                post {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@post
                    }

                    val form = call.receive<CalendarCreateForm>()
                    val calendarId = calendarService.createCalendar(form)
                    call.respond(calendarId)
                }

                put("/{id}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@put
                    }

                    val id = call.parameters["id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@put
                    }

                    val form = call.receive<CalendarCreateForm>()
                    val calendarId = calendarService.updateCalendar(CalendarId(id), form)
                    if (calendarId != null) {
                        call.respond(HttpStatusCode.NoContent)
                    } else {
                        call.respond(HttpStatusCode.NotFound)
                    }
                }

                delete("/{id}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    if (principal.user.role == UserRole.GUEST) {
                        call.respond(HttpStatusCode.Forbidden)
                        return@delete
                    }

                    val id = call.parameters["id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@delete
                    }

                    val success = calendarService.deleteCalendar(CalendarId(id))
                    if (success) {
                        call.respond(HttpStatusCode.NoContent)
                    } else {
                        call.respond(HttpStatusCode.NotFound)
                    }
                }

                get("/{id}") {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val id = call.parameters["id"]?.toIntOrNull() ?: run {
                        call.respond(HttpStatusCode.BadRequest)
                        return@get
                    }

                    val calendar = calendarService.findCalendarById(CalendarId(id))
                    if (calendar != null) {
                        call.respond(calendar)
                    } else {
                        call.respond(HttpStatusCode.NotFound)
                    }
                }

                get {
                    val principal: JWTUserPrincipal =
                        call.principal<JWTUserPrincipal>() ?: throw Exception("No principal")

                    val calendars = calendarService.findAllCalendars()
                    call.respond(calendars)
                }
            }
        }
    }
}