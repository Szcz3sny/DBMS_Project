package bazydanych.service.form

import io.konform.validation.Validation
import io.konform.validation.jsonschema.maxLength
import io.konform.validation.jsonschema.maximum
import io.konform.validation.jsonschema.minLength
import io.konform.validation.jsonschema.minimum
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Serializable
data class VehicleCreateForm(
    val brand: String,
    val model: String,
    val yearOfProduction: Int,
    val vin: String,
    val licensePlate: String,
)

val validateVehicleCreateForm = Validation {
    VehicleCreateForm::brand {
        minLength(5)
        maxLength(64)
    }

    VehicleCreateForm::model {
        minLength(5)
        maxLength(64)
    }

    VehicleCreateForm::yearOfProduction {
        minimum(1900)
        maximum(LocalDateTime.now().year)
    }

    VehicleCreateForm::vin {
        minLength(17)
        maxLength(17)
    }

    VehicleCreateForm::licensePlate {
        minLength(5)
        maxLength(10)
    }
}