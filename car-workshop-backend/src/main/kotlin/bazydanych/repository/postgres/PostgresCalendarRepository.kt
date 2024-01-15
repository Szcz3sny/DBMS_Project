package bazydanych.repository.postgres

import bazydanych.model.VehicleId
import bazydanych.service.CalendarCreateDetails
import bazydanych.repository.CalendarRepository
import kotlinx.coroutines.withContext
import kotlinx.datetime.toJavaLocalDateTime
import kotlinx.datetime.toKotlinLocalDateTime
import bazydanych.model.calendar.Calendar
import bazydanych.model.calendar.CalendarId
import bazydanych.model.user.UserId
import bazydanych.repository.table.CalendarsTable

import kotlinx.coroutines.Dispatchers
import org.jooq.DSLContext
import org.jooq.Record
import java.sql.Timestamp

class PostgresCalendarRepository(private val jooq: DSLContext) : CalendarRepository {

    override suspend fun findCalendarById(id: CalendarId): Calendar? = withContext(Dispatchers.IO) {
        jooq.selectFrom(CalendarsTable.TABLE).where(CalendarsTable.ID.eq(id.value)).fetchOne()?.let { parse(it) }
    }

    override suspend fun findCalendarByUserId(userId: UserId): List<Calendar> = withContext(Dispatchers.IO) {
        jooq.selectFrom(CalendarsTable.TABLE).where(CalendarsTable.ID_USER.eq(userId.value)).fetch().map { parse(it) }
    }

    override suspend fun findAllCalendars(): List<Calendar> = withContext(Dispatchers.IO) {
        jooq.selectFrom(CalendarsTable.TABLE).fetch().map { parse(it) }
    }

    override suspend fun updateCalendar(id: CalendarId, details: CalendarCreateDetails): Calendar? =
        withContext(Dispatchers.IO) {
            jooq.update(CalendarsTable.TABLE)
                .set(CalendarsTable.ID_USER, details.userId)
                .set(CalendarsTable.ID_VEHICLE, details.vehicleId)
                .set(CalendarsTable.DATETIME, details.datetime.toJavaLocalDateTime())
                .set(CalendarsTable.DEFECT, details.defect)
                .set(CalendarsTable.STATUS, details.status)
                .where(CalendarsTable.ID.eq(id.value))
                .returning()
                .fetchOne()?.let { parse(it) }
        }

    override suspend fun deleteCalendar(id: CalendarId): Boolean {
        return withContext(Dispatchers.IO) {
            jooq.deleteFrom(CalendarsTable.TABLE).where(CalendarsTable.ID.eq(id.value)).execute() > 0
        }
    }

    override suspend fun createCalendar(details: CalendarCreateDetails): CalendarId =
        withContext(Dispatchers.IO) {
            val id = jooq.insertInto(CalendarsTable.TABLE)
                .set(CalendarsTable.ID_USER, details.userId)
                .set(CalendarsTable.ID_VEHICLE, details.vehicleId)
                .set(CalendarsTable.DATETIME, details.datetime.toJavaLocalDateTime())
                .set(CalendarsTable.DEFECT, details.defect)
                .set(CalendarsTable.STATUS, details.status)
                .returning(CalendarsTable.ID)
                .fetchOne()

            val calendarId = id?.getValue(CalendarsTable.ID)
                ?: throw IllegalStateException("Failed to create calendar")

            CalendarId(calendarId)
        }


    private fun parse(it: Record?): Calendar {
        return it!!.let {
            Calendar(
                id = CalendarId(it.getValue(CalendarsTable.ID)),
                vehicleId = VehicleId(it.getValue(CalendarsTable.ID_VEHICLE)),
                userId = UserId(it.getValue(CalendarsTable.ID_USER)),
                datetime = it.get(CalendarsTable.DATETIME, Timestamp::class.java)
                    .toLocalDateTime()
                    .toKotlinLocalDateTime(),
                defect = it.getValue(CalendarsTable.DEFECT),
                status = it.getValue(CalendarsTable.STATUS),
            )
        }
    }



}