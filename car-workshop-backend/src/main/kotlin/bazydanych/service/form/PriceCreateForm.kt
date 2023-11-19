package bazydanych.service.form

import bazydanych.util.BigDecimalSerializer
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class PriceCreateForm(
    val name: String,
    val description: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
)