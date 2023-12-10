package bazydanych.repository

import bazydanych.model.repair.RepairId
import bazydanych.model.user.UserId

interface RepairsRepository {

    suspend fun insert(repairDetails: RepairCreateDetails): RepairId

    suspend fun findVehicleOwnerByRepairId(repairId: RepairId): UserId?
}