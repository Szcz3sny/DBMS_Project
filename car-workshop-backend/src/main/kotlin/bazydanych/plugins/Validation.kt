package bazydanych.plugins

import bazydanych.service.form.*
import io.ktor.server.application.*
import io.ktor.server.plugins.requestvalidation.*

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
}

private fun <T> mapKonformValidationResult(result: io.konform.validation.ValidationResult<T>): ValidationResult {
    return when (result) {
        is io.konform.validation.Invalid -> ValidationResult.Invalid(result.errors.map { "${it.dataPath}: ${it.message}"})
        is io.konform.validation.Valid -> ValidationResult.Valid
    }
}