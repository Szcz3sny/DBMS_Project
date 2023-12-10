package bazydanych.repository

import bazydanych.model.VehicleId
import java.math.BigDecimal

data class RepairCreateDetails(
    val vehicleId: VehicleId,
    val description: String,
    val price: BigDecimal
)