package bazydanych.repository.postgres

import bazydanych.model.file.FileId
import bazydanych.model.file.StoredFile
import bazydanych.repository.FileDataRepository
import bazydanych.repository.table.FileStorageTable
import bazydanych.service.PhotoUrl
import bazydanych.util.randomString
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext

class PostgresFileDataRepository(
    private val jooq: DSLContext,
) : FileDataRepository {

    override suspend fun insert(type: String, fileData: ByteArray): PhotoUrl = withContext(Dispatchers.IO) {
        val viewToken = randomString(48)

        jooq.insertInto(FileStorageTable.TABLE)
            .columns(
                FileStorageTable.TYPE,
                FileStorageTable.DATA,
                FileStorageTable.VIEW_TOKEN
            )
            .values(
                type,
                fileData,
                viewToken,
            ).returning(FileStorageTable.VIEW_TOKEN).fetchOne()?.let {
                it.getValue(FileStorageTable.VIEW_TOKEN) ?: throw IllegalStateException("No view token returned")
            } ?: throw IllegalStateException("No result data returned")
    }

    override suspend fun get(viewToken: String): StoredFile? = withContext(Dispatchers.IO) {
        jooq.selectFrom(FileStorageTable.TABLE.where(FileStorageTable.VIEW_TOKEN.eq(viewToken))).fetchOne { parse(it) }
    }

    private fun parse(it: org.jooq.Record): StoredFile = StoredFile(
        id = FileId(it.getValue(FileStorageTable.ID)),
        type = it.getValue(FileStorageTable.TYPE),
        data = it.getValue(FileStorageTable.DATA),
        viewToken = it.getValue(FileStorageTable.VIEW_TOKEN),
    )
}