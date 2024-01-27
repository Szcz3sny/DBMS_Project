package bazydanych.service

import bazydanych.model.repair.RepairId
import bazydanych.model.repair.Repair
import bazydanych.model.repair.RepairPhotoId
import bazydanych.model.user.UserId
import bazydanych.model.VehicleId
import bazydanych.model.repair.RepairStatus
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
    suspend fun findAllRepairs(): List<Repair> {
        return repairsRepository.findAllRepairs()
    }
    suspend fun addRepairPhoto(repairId: RepairId, fileStream: InputStream) : RepairPhotoId {
        val imageUrl = fileStorageService.uploadImage(fileStream)
        return repairPhotosRepository.insert(repairId, imageUrl)
    }

    suspend fun findAllRepairsByVehicleId(vehicleId: VehicleId): List<Repair> {
        return repairsRepository.findAllRepairsByVehicleId(vehicleId)
    }

    suspend fun getRepairStatusByVehicleId(vehicleId: VehicleId): List<String> {
        return repairsRepository.getRepairStatusByVehicleId(vehicleId)
    }

    suspend fun updateRepairStatus(repairId: RepairId, status: RepairStatus): Boolean {
        return repairsRepository.updateStatus(repairId, status)
    }

    suspend fun deleteRepairPhoto(id: RepairPhotoId): Boolean {
        return repairPhotosRepository.deleteRepairPhoto(id)
    }

    suspend fun deleteRepair(repairId: RepairId): Boolean {
        // Delete the photos associated with the repair
        val photosDeleted = repairPhotosRepository.deletePhotosByRepairId(repairId)

        // If the photos were deleted successfully, delete the repair
        if (photosDeleted) {
            return repairsRepository.deleteRepair(repairId)
        }

        // If the photos were not deleted successfully, return false
        return false
    }

    suspend fun findVehicleOwnerByRepairId(repairId: RepairId): UserId? {
        return repairsRepository.findVehicleOwnerByRepairId(repairId)
    }
    suspend fun findRepairPhotosIdsByRepairId(repairId: RepairId): List<RepairPhotoView> {
        return repairPhotosRepository.findRepairPhotosByRepairId(repairId).map { it.toDto() }
    }
}