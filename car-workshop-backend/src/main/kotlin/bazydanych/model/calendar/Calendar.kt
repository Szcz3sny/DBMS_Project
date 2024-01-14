package bazydanych.model.calendar

import bazydanych.model.Id
import bazydanych.model.VehicleId
import bazydanych.model.user.UserId
import kotlinx.datetime.LocalDateTime
import kotlinx.serialization.Serializable

typealias CalendarId = Id<Calendar>

@Serializable
data class Calendar(
    val id: CalendarId,
    val vehicleId: VehicleId,
    val userId: UserId,
    val datetime: LocalDateTime,
    val defect: String,
    val status: String
)