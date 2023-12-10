package bazydanych.model.calendar

import bazydanych.model.Id
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

typealias CalendarId = Id<Calendar>

@Serializable
data class Calendar(
    val id: CalendarId,
    val id_Vehicle: Int,
    val id_User: Int,
    val datetime: LocalDateTime,
    val defect: String,
    val status: String
)