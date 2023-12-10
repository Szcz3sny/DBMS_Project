package bazydanych.model.repair

import bazydanych.model.Id
import kotlinx.serialization.Serializable

typealias RepairPhotoId = Id<RepairPhoto>

@Serializable
data class RepairPhoto(
    val id: RepairPhotoId,
    val repairId: RepairId,
    val photoUrl: String
)