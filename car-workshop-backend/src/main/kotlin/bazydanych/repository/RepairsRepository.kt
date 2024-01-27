package bazydanych.repository

import bazydanych.model.repair.RepairId
import bazydanych.model.repair.Repair
import bazydanych.model.user.UserId
import bazydanych.model.VehicleId
import bazydanych.model.repair.RepairStatus

interface RepairsRepository {

    suspend fun insert(repairDetails: RepairCreateDetails): RepairId

    suspend fun updateStatus(repairId: RepairId, status: RepairStatus): Boolean

    suspend fun findVehicleOwnerByRepairId(repairId: RepairId): UserId?

    suspend fun getRepairStatusByVehicleId(vehicleId: VehicleId): List<String>

    suspend fun findAllRepairs(): List<Repair>
}