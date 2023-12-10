package bazydanych.service

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import bazydanych.repository.PartsRepository
import bazydanych.service.dto.PartsView
import bazydanych.service.dto.toDto
import bazydanych.service.form.PartsCreateForm

class PartsService(private val partsRepository: PartsRepository) {

    suspend fun findPartsById(id: PartsId): PartsView? {
        val parts = partsRepository.findPartsById(id) ?: return null
        return parts.toDto()
    }

    suspend fun findAllParts(): List<PartsView> {
        val parts = partsRepository.findAllParts()
        return parts.map { it.toDto() }
    }

    suspend fun createParts(form: PartsCreateForm): Parts {
        // Validation logic if needed

        val details = PartsCreateDetails(
            name = form.name,
            price = form.price,
        )

        val id = partsRepository.save(details)

        return Parts(
            id = id,
            name = details.name,
            price = details.price,
        )
    }

    suspend fun updateParts(id: PartsId, form: PartsCreateForm): Parts {
        // Validation logic if needed

        val details = PartsCreateDetails(
            name = form.name,
            price = form.price,
        )

        return partsRepository.updateParts(id, details) ?: throw NoSuchElementException("Part not found")
    }

    suspend fun deleteParts(id: PartsId): Boolean {
        return partsRepository.deleteParts(id)
    }
}
