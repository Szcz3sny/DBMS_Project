package bazydanych.service.form

import bazydanych.util.BigDecimalSerializer
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class PartsCreateForm(
    val id_Vehicle: Int,
    val product_name: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
)