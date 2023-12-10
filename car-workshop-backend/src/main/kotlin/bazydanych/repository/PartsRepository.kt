package bazydanych.repository

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import bazydanych.service.PartsCreateDetails

interface PartsRepository {

    suspend fun findPartsById(id: PartsId): Parts?

    suspend fun insert(details: PartsCreateDetails): Parts

    suspend fun delete(id: PartsId): Boolean

    suspend fun save(details: PartsCreateDetails): PartsId

    suspend fun updateImage(id: PartsId, imageUrl: String): Boolean
}
