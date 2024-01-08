package bazydanych.service
import java.math.BigDecimal

data class PartsCreateDetails(
    val vehicleId: Int,
    val productName: String,
    val price: BigDecimal,
    val image: String
)