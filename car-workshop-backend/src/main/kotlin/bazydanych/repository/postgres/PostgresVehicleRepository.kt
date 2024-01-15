package bazydanych.repository.postgres

import bazydanych.model.user.UserId
import bazydanych.model.Vehicle
import bazydanych.model.VehicleId
import bazydanych.repository.VehicleCreateDetails
import bazydanych.repository.VehicleRepository
import bazydanych.repository.table.VehiclesTable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.Record

class PostgresVehicleRepository(private val jooq: DSLContext) : VehicleRepository {
    override suspend fun findVehicleById(id: VehicleId): Vehicle? = withContext(Dispatchers.IO) {
        jooq.selectFrom(VehiclesTable.TABLE.where(VehiclesTable.ID.eq(id.value))).fetchOne { parse(it) }
    }

    override suspend fun findVehiclesByOwnerId(ownerId: UserId): List<Vehicle> = withContext(Dispatchers.IO) {
        jooq.selectFrom(VehiclesTable.TABLE.where(VehiclesTable.OWNER_ID.eq(ownerId.value))).fetch { parse(it) }
    }

    override suspend fun insert(vehicle: VehicleCreateDetails): VehicleId = withContext(Dispatchers.IO) {
        jooq.insertInto(VehiclesTable.TABLE)
            .columns(
                VehiclesTable.OWNER_ID,
                VehiclesTable.BRAND,
                VehiclesTable.MODEL,
                VehiclesTable.YEAR_OF_PRODUCTION,
                VehiclesTable.VIN,
                VehiclesTable.LICENSE_PLATE
            ).values(
                vehicle.ownerId.value,
                vehicle.brand,
                vehicle.model,
                vehicle.yearOfProduction,
                vehicle.vin,
                vehicle.licensePlate
            ).returning(VehiclesTable.ID).fetchOne()?.let {
                val id = it.getValue(VehiclesTable.ID) ?: throw IllegalStateException("No vehicle id returned")
                VehicleId(id)
            } ?: throw IllegalStateException("No vehicle id returned")
    }

    override suspend fun delete(id: VehicleId): Boolean = withContext(Dispatchers.IO) {
        jooq.deleteFrom(VehiclesTable.TABLE).where(VehiclesTable.ID.eq(id.value)).execute() > 0
    }

    private fun parse(it: Record): Vehicle = Vehicle(
            id = VehicleId(it.getValue(VehiclesTable.ID)),
            ownerId = UserId(it.getValue(VehiclesTable.OWNER_ID)),
            brand = it.getValue(VehiclesTable.BRAND),
            model = it.getValue(VehiclesTable.MODEL),
            yearOfProduction = it.getValue(VehiclesTable.YEAR_OF_PRODUCTION),
            vin = it.getValue(VehiclesTable.VIN),
            licensePlate = it.getValue(VehiclesTable.LICENSE_PLATE)
        )
}