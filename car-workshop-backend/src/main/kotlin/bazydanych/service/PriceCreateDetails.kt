package bazydanych.service
import java.math.BigDecimal

data class PriceCreateDetails(
    val name: String,
    val description: String,
    val price: BigDecimal
)