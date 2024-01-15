package bazydanych.service.dto

import bazydanych.model.VehicleId
import bazydanych.model.calendar.Calendar
import bazydanych.model.calendar.CalendarId
import bazydanych.model.user.UserId
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable


@Serializable
data class CalendarView(
    val id: CalendarId,
    val datetime: LocalDateTime,
    val defect: String,
    val userId: UserId,
    val vehicleId: VehicleId,
    val status: String
)

fun Calendar.toDto() = CalendarView(
    id = id,
    datetime = datetime,
    defect = defect,
    userId = userId,
    vehicleId = vehicleId,
    status = status,
)