package bazydanych.service.form

import bazydanych.util.BigDecimalSerializer
import io.r2dbc.spi.Blob
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class PartsCreateForm(
    val name: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
)