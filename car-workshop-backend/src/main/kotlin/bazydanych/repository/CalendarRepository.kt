package bazydanych.repository

import bazydanych.model.calendar.Calendar
import bazydanych.model.calendar.CalendarId
import bazydanych.service.CalendarCreateDetails

interface CalendarRepository {

    suspend fun findCalendarById(id: CalendarId): Calendar?

    suspend fun findAllCalendars(): List<Calendar>

    suspend fun updateCalendar(id: CalendarId, details: CalendarCreateDetails): Calendar?

    suspend fun createCalendar(details: CalendarCreateDetails): CalendarId

    suspend fun deleteCalendar(id: CalendarId): Boolean
}
