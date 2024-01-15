package bazydanych.service

import bazydanych.model.VehicleId
import bazydanych.model.user.User
import bazydanych.repository.VehicleCreateDetails
import bazydanych.repository.VehicleRepository
import bazydanych.service.dto.VehicleView
import bazydanych.service.dto.toDto
import bazydanych.service.form.VehicleCreateForm

class VehicleService(
    private val vehicleRepository: VehicleRepository,
    private val userService: UserService,
) {

    suspend fun findVehicleById(id: VehicleId): VehicleView? {
        val vehicle = vehicleRepository.findVehicleById(id) ?: return null
        val owner = userService.findUserById(vehicle.ownerId) ?: return null
        return vehicle.toDto(owner.toDto())
    }

    suspend fun findVehiclesByOwner(owner: User): List<VehicleView> {
        val vehicles = vehicleRepository.findVehiclesByOwnerId(owner.id)
        val ownerView = owner.toDto()
        return vehicles.map { it.toDto(ownerView) }
    }

    suspend fun addVehicle(owner: User, form: VehicleCreateForm): VehicleId {
        val details = VehicleCreateDetails(
            ownerId = owner.id,
            brand = form.brand,
            model = form.model,
            yearOfProduction = form.yearOfProduction,
            vin = form.vin,
            licensePlate = form.licensePlate,
        )

        return vehicleRepository.insert(details)
    }

    suspend fun deleteVehicle(id: VehicleId): Boolean {
        return vehicleRepository.delete(id)
    }
}