package bazydanych.model.price

import bazydanych.model.Id
import kotlinx.serialization.Serializable
import java.math.BigDecimal

typealias PriceId = Id<Price>

@Serializable
data class Price(
    val id: PriceId,
    val name: String,
    val description: String,
    val price: String
)

