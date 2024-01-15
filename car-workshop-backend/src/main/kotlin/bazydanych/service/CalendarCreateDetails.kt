package bazydanych.service

import kotlinx.datetime.LocalDateTime
data class CalendarCreateDetails(
    val userId: Int,
    val vehicleId: Int,
    val defect: String,
    val datetime: LocalDateTime,
    val status: String
)