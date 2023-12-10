package bazydanych.service.dto

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import kotlinx.serialization.Serializable

@Serializable
data class PartsView(
    val id: PartsId,
    val name: String,
    val price: String,
)

fun Parts.toDto() = PartsView(
    id = id,
    name = name,
    price = price.toPlainString(),
)
