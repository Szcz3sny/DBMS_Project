package bazydanych.service

import kotlinx.datetime.LocalDateTime
data class CalendarCreateDetails(
    val id: Int,
    val id_User: Int,
    val id_Vehicle: Int,
    val defect: String,
    val datetime: LocalDateTime,
    val status: String
)