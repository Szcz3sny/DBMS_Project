package bazydanych.service

import bazydanych.model.calendar.CalendarId
import bazydanych.repository.CalendarRepository
import bazydanych.service.dto.CalendarView
import bazydanych.service.form.CalendarCreateForm
import bazydanych.service.dto.toDto
import bazydanych.model.user.UserId


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

    suspend fun findCalendarByUserId(userId: UserId): List<CalendarView> {
        val calendars = calendarRepository.findCalendarByUserId(userId)
        return calendars.map { it.toDto() }
    }

    private fun CalendarCreateForm.toCalendarCreateDetails(): CalendarCreateDetails {
        return CalendarCreateDetails(
            vehicleId = this.vehicleId,
            userId = this.userId,
            datetime = this.datetime,
            defect = this.defect,
            status = this.status
        )
    }
}