package bazydanych.util

import org.apache.tika.Tika
import java.io.InputStream

private val allowedFileTypes = listOf("image/png", "image/jpeg")
private val tika = Tika()

fun validateImageData(fileStream: InputStream) : String {
    val type = tika.detect(fileStream)
    if (!allowedFileTypes.contains(type)) {
        throw InvalidFileFormatException("File type $type not allowed")
    }
    return type
}

class InvalidFileFormatException(message: String) : IllegalArgumentException(message)