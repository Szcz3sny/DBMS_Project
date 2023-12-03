package bazydanych.service.dto

import bazydanych.model.price.Price
import bazydanych.model.price.PriceId
import kotlinx.serialization.Serializable

@Serializable
data class PriceView(
    val id: PriceId,
    val name: String,
    val description: String,
    val price: String
)

fun Price.toDto() = PriceView(
    id = id,
    name = name,
    description = description,
    price = price.toPlainString()
)