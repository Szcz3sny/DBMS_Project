package bazydanych.service

import java.math.BigDecimal

data class PartsCreateDetails(
    val name: String,
    val price: BigDecimal,
)