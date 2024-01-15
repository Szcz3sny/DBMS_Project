package bazydanych.model.repair

import bazydanych.model.Id
import bazydanych.model.VehicleId
import bazydanych.util.BigDecimalSerializer
import kotlinx.serialization.Serializable
import java.math.BigDecimal

typealias RepairId = Id<Repair>

@Serializable
data class Repair(
    val id: RepairId,
    val vehicleId: VehicleId,
    val description: String,
    val status: RepairStatus,
    @Serializable(with = BigDecimalSerializer::class)
    val price: BigDecimal
)