package bazydanych.service.dto

import bazydanych.model.Vehicle
import bazydanych.model.VehicleId

data class VehicleView(
    val id: VehicleId,
    val owner: UserView,
    val brand: String,
    val model: String,
    val yearOfProduction: Int,
    val vin: String,
    val licensePlate: String,
)

fun Vehicle.toDto(owner: UserView) = VehicleView(
    id = id,
    owner = owner,
    brand = brand,
    model = model,
    yearOfProduction = yearOfProduction,
    vin = vin,
    licensePlate = licensePlate,
)