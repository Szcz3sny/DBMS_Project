package bazydanych.module

import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.server.application.*
import io.ktor.server.plugins.*
import io.ktor.server.request.*

private val imageContentTypes = listOf(
    ContentType.Image.JPEG,
    ContentType.Image.PNG
)

suspend fun ApplicationCall.receiveImageFile(partName: String): PartData.FileItem { // TODO get part by name
    val multiPartFormData = receiveMultipart()
    val partData = multiPartFormData.readPart()
        ?: throw BadRequestException("No file provided")
    if (partData !is PartData.FileItem)
        throw BadRequestException("Invalid multipart type")

    val contentType = partData.contentType
        ?: throw BadRequestException("No file content type provided")
    if (!imageContentTypes.contains(contentType))
        throw BadRequestException("Invalid file content type")

    val contentLength = request.contentLength()
        ?: throw BadRequestException("No file content length provided")
    if (contentLength > 5 * 1024 * 1024)
        throw BadRequestException("File too large") // 5 MB
    return partData
}