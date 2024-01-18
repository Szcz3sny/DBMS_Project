package bazydanych.repository.postgres

import bazydanych.model.repair.RepairId
import bazydanych.model.repair.RepairStatus
import bazydanych.model.VehicleId
import bazydanych.model.user.UserId
import bazydanych.repository.RepairCreateDetails
import bazydanych.repository.RepairsRepository
import bazydanych.repository.table.RepairsTable
import bazydanych.repository.table.VehiclesTable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

class PostgresRepairsRepository(private val jooq: DSLContext) : RepairsRepository {

    override suspend fun insert(repairDetails: RepairCreateDetails): RepairId = withContext(Dispatchers.IO) {
        jooq.insertInto(RepairsTable.TABLE)
            .columns(
                RepairsTable.VEHICLE_ID,
                RepairsTable.DESCRIPTION,
                RepairsTable.STATUS,
                RepairsTable.PRICE
            ).values(
                repairDetails.vehicleId.value,
                repairDetails.description,
                RepairStatus.PENDING.name,
                repairDetails.price
            ).returning(RepairsTable.ID).fetchOne()?.let {
                val id = it.getValue(RepairsTable.ID) ?: throw IllegalStateException("No repair id returned")
                RepairId(id)
            } ?: throw IllegalStateException("No result data returned")
    }

    override suspend fun findVehicleOwnerByRepairId(repairId: RepairId): UserId? = withContext(Dispatchers.IO) {
        jooq.select(VehiclesTable.OWNER_ID)
            .from(VehiclesTable.TABLE)
            .join(RepairsTable.TABLE).on(VehiclesTable.ID.eq(RepairsTable.VEHICLE_ID))
            .where(RepairsTable.ID.eq(repairId.value))
            .fetchOne()?.let {
                val vehicleId = it.getValue(VehiclesTable.OWNER_ID) ?: throw IllegalStateException("No user id returned")
                UserId(vehicleId)
            }
    }

    override suspend fun getRepairStatusByVehicleId(vehicleId: VehicleId): List<String> = withContext(Dispatchers.IO) {
        jooq.select(RepairsTable.STATUS)
            .from(RepairsTable.TABLE)
            .where(RepairsTable.VEHICLE_ID.eq(vehicleId.value))
            .fetch(RepairsTable.STATUS)
    }
}