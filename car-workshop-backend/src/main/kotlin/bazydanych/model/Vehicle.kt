package bazydanych.model

import bazydanych.model.user.UserId
import kotlinx.serialization.Serializable

typealias VehicleId = Id<Vehicle>

@Serializable
data class Vehicle(
    val id: VehicleId,
    val ownerId: UserId,
    val brand: String,
    val model: String,
    val yearOfProduction: Int,
    val vin: String,
    val licensePlate: String,
)