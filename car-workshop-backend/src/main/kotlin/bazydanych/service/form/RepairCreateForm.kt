package bazydanych.service.form

import bazydanych.model.VehicleId
import bazydanych.util.BigDecimalSerializer
import io.konform.validation.Validation
import io.konform.validation.jsonschema.maxLength
import io.konform.validation.jsonschema.minLength
import io.konform.validation.jsonschema.minimum
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class RepairCreateForm(
    val vehicleId: VehicleId,
    val description: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
)

val validateRepairCreateForm = Validation {
    RepairCreateForm::description {
        minLength(5)
        maxLength(4096)
    }

    RepairCreateForm::price {
        minimum(BigDecimal.ZERO)
    }
}