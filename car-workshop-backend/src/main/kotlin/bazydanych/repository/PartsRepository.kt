package bazydanych.repository

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import bazydanych.service.PartsCreateDetails

interface PartsRepository {

    suspend fun findPartsById(id: PartsId): Parts?

    suspend fun findAllParts(): List<Parts>

    suspend fun updateParts(id: PartsId, details: PartsCreateDetails): Parts?

    suspend fun createParts(details: PartsCreateDetails): Boolean

    suspend fun deleteParts(id: PartsId): Boolean

    suspend fun save(details: PartsCreateDetails): PartsId
}