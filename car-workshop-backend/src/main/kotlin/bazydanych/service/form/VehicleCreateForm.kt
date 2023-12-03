package bazydanych.service.form

data class VehicleCreateForm(
    val brand: String,
    val model: String,
    val yearOfProduction: Int,
    val vin: String,
    val licensePlate: String,
)