package bazydanych.model.parts

import bazydanych.model.Id
import bazydanych.util.BigDecimalSerializer
import kotlinx.serialization.Serializable
import java.math.BigDecimal

typealias PartsId = Id<Parts>

@Serializable
data class Parts(
    val id: PartsId,
    val vehicleId: Int,
    val productName: String,
    val image: String? = null,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
    )
