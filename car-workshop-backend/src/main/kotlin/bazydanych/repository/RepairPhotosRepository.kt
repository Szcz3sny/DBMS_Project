package bazydanych.repository

import bazydanych.model.repair.RepairId
import bazydanych.model.repair.RepairPhoto
import bazydanych.model.repair.RepairPhotoId
import bazydanych.service.PhotoUrl

interface RepairPhotosRepository {

    suspend fun insert(repairId: RepairId, url: PhotoUrl): RepairPhotoId

    suspend fun findRepairPhotoById(id: RepairPhotoId): RepairPhoto?

    suspend fun findRepairPhotosByRepairId(repairId: RepairId): List<RepairPhoto>

    suspend fun deleteRepairPhoto(id: RepairPhotoId): Boolean
}