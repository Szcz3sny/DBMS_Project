package bazydanych.service.form

import bazydanych.model.VehicleId
import bazydanych.util.BigDecimalSerializer
import kotlinx.serialization.Serializable
import java.math.BigDecimal

@Serializable
data class RepairCreateForm(
    val vehicleId: VehicleId,
    val description: String,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal,
)