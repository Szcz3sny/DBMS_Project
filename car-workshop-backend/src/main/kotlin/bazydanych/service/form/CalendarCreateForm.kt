package bazydanych.service.form

import kotlinx.serialization.Serializable
import kotlinx.datetime.LocalDateTime

@Serializable
data class CalendarCreateForm(
    val vehicleId: Int,
    val userId: Int,
    val defect: String,
    val datetime: LocalDateTime,
    val status: String,
)