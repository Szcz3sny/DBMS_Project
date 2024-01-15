package bazydanych.repository.postgres

import bazydanych.model.repair.RepairId
import bazydanych.model.repair.RepairPhoto
import bazydanych.model.repair.RepairPhotoId
import bazydanych.repository.RepairPhotosRepository
import bazydanych.repository.table.RepairPhotosTable
import bazydanych.service.PhotoUrl
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

class PostgresRepairPhotosRepository(
    private val jooq: DSLContext
) : RepairPhotosRepository {

    override suspend fun insert(repairId: RepairId, url: PhotoUrl): RepairPhotoId = withContext(Dispatchers.IO) {
        jooq.insertInto(RepairPhotosTable.TABLE)
            .columns(
                RepairPhotosTable.REPAIR_ID,
                RepairPhotosTable.PHOTO_URL,
            ).values(
                repairId.value,
                url,
            ).returning(RepairPhotosTable.ID).fetchOne()?.let {
                val id =
                    it.getValue(RepairPhotosTable.ID) ?: throw IllegalStateException("No repair photo id returned")
                RepairPhotoId(id)
            } ?: throw IllegalStateException("No result data returned")
    }

    override suspend fun findRepairPhotoById(id: RepairPhotoId): RepairPhoto? = withContext(Dispatchers.IO) {
        jooq.selectFrom(RepairPhotosTable.TABLE.where(RepairPhotosTable.ID.eq(id.value))).fetchOne { parse(it) }
    }

    override suspend fun findRepairPhotosByRepairId(repairId: RepairId): List<RepairPhoto> =
        withContext(Dispatchers.IO) {
            jooq.selectFrom(RepairPhotosTable.TABLE.where(RepairPhotosTable.REPAIR_ID.eq(repairId.value))).fetch {
                parse(it)
            }
        }

    override suspend fun deleteRepairPhoto(id: RepairPhotoId): Boolean = withContext(Dispatchers.IO) {
        jooq.deleteFrom(RepairPhotosTable.TABLE).where(RepairPhotosTable.ID.eq(id.value)).execute() > 0
    }

    private fun parse(it: org.jooq.Record): RepairPhoto = RepairPhoto(
        id = RepairPhotoId(it.getValue(RepairPhotosTable.ID)),
        repairId = RepairId(it.getValue(RepairPhotosTable.REPAIR_ID)),
        photoUrl = it.getValue(RepairPhotosTable.PHOTO_URL),
    )
}