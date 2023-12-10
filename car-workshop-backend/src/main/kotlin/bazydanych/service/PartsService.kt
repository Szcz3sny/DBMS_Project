package bazydanych.service

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import bazydanych.repository.PartsRepository
import bazydanych.service.form.PartsCreateForm
import java.io.InputStream

class PartsService(
    private val partsRepository: PartsRepository,
    private val fileStorageService: FileStorageService
) {

    suspend fun findPartsById(id: PartsId): Parts? {
        return partsRepository.findPartsById(id)
    }

    suspend fun createParts(form: PartsCreateForm): Parts {
        val details = PartsCreateDetails(
            id_Vehicle = form.id_Vehicle,
            product_name = form.product_name,
            price = form.price,
            image = null.toString()
        )

        val id = partsRepository.save(details)

        return Parts(
            id = id,
            id_Vehicle = form.id_Vehicle,
            product_name = form.product_name,
            price = form.price,
            image = null
        )
    }

    suspend fun deleteParts(id: PartsId): Boolean {
        return partsRepository.delete(id)
    }

    suspend fun updateImage(id: PartsId, fileStream: InputStream): Boolean {
        val imageUrl = fileStorageService.uploadImage(fileStream)
        return partsRepository.updateImage(id, imageUrl)
    }

}