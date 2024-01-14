package bazydanych.repository

import bazydanych.model.calendar.Calendar
import bazydanych.model.calendar.CalendarId
import bazydanych.service.CalendarCreateDetails
import bazydanych.model.user.UserId

interface CalendarRepository {

    suspend fun findCalendarById(id: CalendarId): Calendar?

    suspend fun findAllCalendars(): List<Calendar>

    suspend fun updateCalendar(id: CalendarId, details: CalendarCreateDetails): Calendar?

    suspend fun createCalendar(details: CalendarCreateDetails): CalendarId

    suspend fun deleteCalendar(id: CalendarId): Boolean

    suspend fun findCalendarByUserId(userId: UserId): List<Calendar>
}
