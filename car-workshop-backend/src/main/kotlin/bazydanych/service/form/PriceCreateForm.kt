package bazydanych.service.form

import bazydanych.util.BigDecimalSerializer
import io.konform.validation.Validation
import io.konform.validation.jsonschema.maxLength
import io.konform.validation.jsonschema.minLength
import io.konform.validation.jsonschema.minimum
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class PriceCreateForm(
    val name: String,
    val description: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
)

val validatePriceCreateForm = Validation {
    PriceCreateForm::name {
        minLength(5)
        maxLength(64)
    }

    PriceCreateForm::description {
        minLength(5)
        maxLength(4096)
    }

    PriceCreateForm::price {
        minimum(BigDecimal.ZERO)
    }
}