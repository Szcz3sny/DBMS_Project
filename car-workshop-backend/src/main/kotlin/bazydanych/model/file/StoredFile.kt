package bazydanych.model.file

import bazydanych.model.Id
import bazydanych.model.repair.RepairPhoto
import kotlinx.serialization.Serializable

typealias FileId = Id<StoredFile>

@Serializable
data class StoredFile(
    val id: FileId,
    val type: String,
    val data: ByteArray,
    val viewToken: String
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as RepairPhoto
        return id == other.id
    }

    override fun hashCode(): Int = id.hashCode()
}