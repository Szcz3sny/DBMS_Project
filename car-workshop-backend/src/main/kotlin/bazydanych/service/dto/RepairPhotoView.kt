package bazydanych.service.dto

import bazydanych.model.repair.RepairPhoto
import bazydanych.model.repair.RepairPhotoId
import kotlinx.serialization.Serializable

@Serializable
data class RepairPhotoView(
    val id: RepairPhotoId,
    val photoUrl: String
)

fun RepairPhoto.toDto() = RepairPhotoView(
    id = id,
    photoUrl = photoUrl
)