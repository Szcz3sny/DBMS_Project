package bazydanych.repository

import bazydanych.model.Vehicle
import bazydanych.model.VehicleId
import bazydanych.model.user.UserId

interface VehicleRepository {

    suspend fun findVehicleById(id: VehicleId): Vehicle?

    suspend fun findVehiclesByOwnerId(ownerId: UserId): List<Vehicle>

    suspend fun insert(vehicle: VehicleCreateDetails): VehicleId

    suspend fun delete(id: VehicleId): Boolean
}