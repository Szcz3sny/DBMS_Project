package bazydanych.service.form

import bazydanych.util.BigDecimalSerializer
import kotlinx.serialization.Serializable
import java.math.BigDecimal
import kotlinx.datetime.LocalDateTime

@Serializable
data class CalendarCreateForm(
    val id: Int,
    val vehicleId: Int,
    val userId: Int,
    val defect: String,
    val datetime: LocalDateTime,
    val status: String,
    val description: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal
)