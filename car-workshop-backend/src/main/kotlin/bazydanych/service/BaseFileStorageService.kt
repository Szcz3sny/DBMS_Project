package bazydanych.service

import bazydanych.model.file.StoredFile
import bazydanych.repository.FileDataRepository
import bazydanych.util.validateImageData
import java.io.InputStream

class BaseFileStorageService(
    private val repository: FileDataRepository,
    private val urlFormat: String
) : FileStorageService {

    override suspend fun uploadImage(fileStream: InputStream): PhotoUrl {
        val fileType = validateImageData(fileStream)
        val viewToken = repository.insert(fileType, fileStream.readBytes())
        return urlFormat.replace("{token}", viewToken)
    }

    suspend fun loadFile(url: PhotoUrl): StoredFile? {
        return repository.get(url)
    }
}