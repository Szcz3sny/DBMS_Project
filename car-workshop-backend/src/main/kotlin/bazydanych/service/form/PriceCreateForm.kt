package bazydanych.service.form

import kotlinx.serialization.Contextual
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class PriceCreateForm(
    val name: String,
    val description: String,
    val price: String,
)