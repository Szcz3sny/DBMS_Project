package bazydanych.repository

import bazydanych.model.file.StoredFile
import bazydanych.service.PhotoUrl

interface FileDataRepository {

    suspend fun insert(type: String, fileData: ByteArray): PhotoUrl

    suspend fun get(viewToken: String): StoredFile?
}