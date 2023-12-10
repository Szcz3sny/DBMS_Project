package bazydanych.repository.postgres

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import bazydanych.repository.PartsRepository
import bazydanych.service.PartsCreateDetails
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.Record
import bazydanych.repository.table.PartsTable

class PostgresPartsRepository(private val jooq: DSLContext) : PartsRepository {

    override suspend fun findPartsById(id: PartsId): Parts? = withContext(Dispatchers.IO) {
        jooq.selectFrom(PartsTable.TABLE.where(PartsTable.ID.eq(id.value))).fetchOne { parse(it) }
    }

    override suspend fun findAllParts(): List<Parts> = withContext(Dispatchers.IO) {
        jooq.selectFrom(PartsTable.TABLE).fetch { parse(it) }
    }

    override suspend fun createParts(details: PartsCreateDetails): Boolean = withContext(Dispatchers.IO) {
        jooq.insertInto(PartsTable.TABLE)
            .columns(
                PartsTable.NAME,
                PartsTable.PRICE,
            )
            .values(
                details.name,
                details.price,
            )
            .returning(PartsTable.ID)
            .fetchOne() != null

    }

    override suspend fun updateParts(id: PartsId, details: PartsCreateDetails): Parts? =
        withContext(Dispatchers.IO) {
            val updatedRecord = jooq.update(PartsTable.TABLE)
                .set(PartsTable.NAME, details.name)
                .set(PartsTable.PRICE, details.price)
                .where(PartsTable.ID.eq(id.value))
                .returning()
                .fetchOne()

            updatedRecord?.let { record -> parse(record) }
        }


    override suspend fun deleteParts(id: PartsId): Boolean = withContext(Dispatchers.IO) {
        jooq.deleteFrom(PartsTable.TABLE).where(PartsTable.ID.eq(id.value)).execute() > 0
    }

    override suspend fun save(details: PartsCreateDetails): PartsId = createParts(details)
        .let { PartsId(jooq.lastID().toInt()) }

    private fun parse(record: Record): Parts {
        return Parts(
            id = PartsId(record.getValue(PartsTable.ID)),
            name = record.getValue(PartsTable.NAME),
            price = record.getValue(PartsTable.PRICE),
        )
    }


}
