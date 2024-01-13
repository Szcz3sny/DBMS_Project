package bazydanych.plugins

import bazydanych.service.form.*
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.requestvalidation.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*

fun Application.configureValidation() {
    install(RequestValidation) {
        validate<UserLoginForm> {
            mapKonformValidationResult(validateLoginForm(it))
        }

        validate<UserCreateForm> {
            mapKonformValidationResult(validateUserCreateForm(it))
        }

        validate<PriceCreateForm> {
            mapKonformValidationResult(validatePriceCreateForm(it))
        }

        validate<RepairCreateForm> {
            mapKonformValidationResult(validateRepairCreateForm(it))
        }

        validate<VehicleCreateForm> {
            mapKonformValidationResult(validateVehicleCreateForm(it))
        }
    }

    install(StatusPages) {
        exception<RequestValidationException> { call, cause ->
            call.respond(HttpStatusCode.BadRequest, cause.reasons.joinToString())
        }
    }
}

private fun <T> mapKonformValidationResult(result: io.konform.validation.ValidationResult<T>): ValidationResult {
    return when (result) {
        is io.konform.validation.Invalid -> ValidationResult.Invalid(result.errors.map { "${it.dataPath}: ${it.message}"})
        is io.konform.validation.Valid -> ValidationResult.Valid
    }
}