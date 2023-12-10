package bazydanych.service

import bazydanych.model.calendar.Calendar
import bazydanych.model.calendar.CalendarId
import bazydanych.repository.CalendarRepository
import bazydanych.service.dto.CalendarView
import bazydanych.service.form.CalendarCreateForm
import java.time.LocalDateTime
import bazydanych.service.dto.toDto


class CalendarService(private val calendarRepository: CalendarRepository) {

    suspend fun findCalendarById(id: CalendarId): CalendarView? {
        val calendar = calendarRepository.findCalendarById(id)
        return calendar?.toDto()
    }

    suspend fun findAllCalendars(): List<CalendarView> {
        val calendars = calendarRepository.findAllCalendars()
        return calendars.map { it.toDto() }
    }

    suspend fun createCalendar(form: CalendarCreateForm): CalendarId {
        val details = form.toCalendarCreateDetails()
        return calendarRepository.createCalendar(details)
    }

    suspend fun updateCalendar(id: CalendarId, form: CalendarCreateForm): CalendarView {
        val details = form.toCalendarCreateDetails()
        return calendarRepository.updateCalendar(id, details)?.toDto()
            ?: throw NoSuchElementException("Calendar not found")
    }

    suspend fun deleteCalendar(id: CalendarId): Boolean {
        return calendarRepository.deleteCalendar(id)
    }

    private fun CalendarCreateForm.toCalendarCreateDetails(): CalendarCreateDetails {
        return CalendarCreateDetails(
            id = this.id,
            id_Vehicle = this.id_Vehicle,
            id_User = this.id_User,
            datetime = this.datetime,
            defect = this.defect,
            status = this.status
        )
    }
}