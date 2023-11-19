package bazydanych.model.price

import bazydanych.model.Id
import bazydanych.util.BigDecimalSerializer
import kotlinx.serialization.Serializable
import java.math.BigDecimal

typealias PriceId = Id<Price>

@Serializable
data class Price(
    val id: PriceId,
    val name: String,
    val description: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal
)

