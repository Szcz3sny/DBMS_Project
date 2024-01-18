package bazydanych.repository

import bazydanych.model.repair.RepairId
import bazydanych.model.user.UserId
import bazydanych.model.VehicleId
import bazydanych.repository.table.RepairsTable

interface RepairsRepository {

    suspend fun insert(repairDetails: RepairCreateDetails): RepairId

    suspend fun findVehicleOwnerByRepairId(repairId: RepairId): UserId?

    suspend fun getRepairStatusByVehicleId(vehicleId: VehicleId): List<String>


}