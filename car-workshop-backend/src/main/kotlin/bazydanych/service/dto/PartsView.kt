package bazydanych.service.dto

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import kotlinx.serialization.Serializable

@Serializable
data class PartsView(
    val id: PartsId,
    val productName: String,
    val price: String,
    val image: String
)

fun Parts.toDto() = PartsView(
    id = id,
    productName = productName,
    price = price.toPlainString(),
    image = image.toString()
)