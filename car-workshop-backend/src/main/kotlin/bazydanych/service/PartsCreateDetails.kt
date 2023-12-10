package bazydanych.service
import java.math.BigDecimal

data class PartsCreateDetails(
    val id_Vehicle: Int,
    val product_name: String,
    val price: BigDecimal,
    val image: String
)