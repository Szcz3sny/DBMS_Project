package bazydanych.service

import java.io.InputStream

typealias PhotoUrl = String

interface FileStorageService {

    suspend fun uploadImage(fileStream: InputStream): PhotoUrl
}