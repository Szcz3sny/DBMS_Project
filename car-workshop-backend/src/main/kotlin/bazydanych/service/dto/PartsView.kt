package bazydanych.service.dto

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class PartsView(
    val id: PartsId,
    val product_name: String,
    val price: String,
    val image: String
)

fun Parts.toDto() = PartsView(
    id = id,
    product_name = product_name,
    price = price.toPlainString(),
    image = image.toString()
)