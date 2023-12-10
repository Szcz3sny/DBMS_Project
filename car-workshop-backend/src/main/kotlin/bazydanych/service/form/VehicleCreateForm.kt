package bazydanych.service.form

import kotlinx.serialization.Serializable

@Serializable
data class VehicleCreateForm(
    val brand: String,
    val model: String,
    val yearOfProduction: Int,
    val vin: String,
    val licensePlate: String,
)