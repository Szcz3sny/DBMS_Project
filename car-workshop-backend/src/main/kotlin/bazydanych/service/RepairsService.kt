package bazydanych.service

import bazydanych.model.repair.RepairId
import bazydanych.model.repair.RepairPhotoId
import bazydanych.model.user.UserId
import bazydanych.repository.RepairCreateDetails
import bazydanych.repository.RepairPhotosRepository
import bazydanych.repository.RepairsRepository
import bazydanych.service.dto.RepairPhotoView
import bazydanych.service.dto.toDto
import bazydanych.service.form.RepairCreateForm
import java.io.InputStream

class RepairsService(
    private val repairsRepository: RepairsRepository,
    private val repairPhotosRepository: RepairPhotosRepository,
    private val fileStorageService: FileStorageService
) {

    suspend fun addRepair(form: RepairCreateForm): RepairId {
        val details = RepairCreateDetails(
            vehicleId = form.vehicleId,
            description = form.description,
            price = form.price,
        )

        return repairsRepository.insert(details)
    }

    suspend fun addRepairPhoto(repairId: RepairId, fileStream: InputStream) : RepairPhotoId {
        val imageUrl = fileStorageService.uploadImage(fileStream)
        return repairPhotosRepository.insert(repairId, imageUrl)
    }

    suspend fun deleteRepairPhoto(id: RepairPhotoId): Boolean {
        return repairPhotosRepository.deleteRepairPhoto(id)
    }

    suspend fun findVehicleOwnerByRepairId(repairId: RepairId): UserId? {
        return repairsRepository.findVehicleOwnerByRepairId(repairId)
    }
    suspend fun findRepairPhotosIdsByRepairId(repairId: RepairId): List<RepairPhotoView> {
        return repairPhotosRepository.findRepairPhotosByRepairId(repairId).map { it.toDto() }
    }
}