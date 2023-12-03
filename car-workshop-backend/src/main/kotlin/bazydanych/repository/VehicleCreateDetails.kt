package bazydanych.repository

import bazydanych.model.user.UserId

data class VehicleCreateDetails(
    val ownerId: UserId,
    val brand: String,
    val model: String,
    val yearOfProduction: Int,
    val vin: String,
    val licensePlate: String,
)