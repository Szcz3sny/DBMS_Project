package bazydanych.repository.postgres

import bazydanych.model.parts.Parts
import bazydanych.model.parts.PartsId
import bazydanych.repository.PartsRepository
import bazydanych.service.PartsCreateDetails
import bazydanych.repository.table.PartsTable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.Record

class PostgresPartsRepository(private val jooq: DSLContext) : PartsRepository {

    override suspend fun findPartsById(id: PartsId): Parts? = withContext(Dispatchers.IO) {
        jooq.selectFrom(PartsTable.TABLE.where(PartsTable.ID.eq(id.value))).fetchOne { parse(it) }
    }

    override suspend fun save(details: PartsCreateDetails): PartsId = withContext(Dispatchers.IO) {
        jooq.insertInto(PartsTable.TABLE)
            .columns(
                PartsTable.VEHICLE_ID,
                PartsTable.PRODUCT_NAME,
                PartsTable.PRICE,
                PartsTable.IMAGE
            ).values(
                details.id_Vehicle,
                details.product_name,
                details.price,
                details.image
            ).returning(PartsTable.ID).fetchOne()?.let {
                val id = it.getValue(PartsTable.ID) ?: throw IllegalStateException("No parts id returned")
                PartsId(id)
            } ?: throw IllegalStateException("No parts id returned")
    }


    override suspend fun delete(id: PartsId) = withContext(Dispatchers.IO) {
        jooq.deleteFrom(PartsTable.TABLE).where(PartsTable.ID.eq(id.value)).execute() > 0
    }

    private fun parse(it: Record): Parts {
        return Parts(
            id = PartsId(it.getValue(PartsTable.ID)),
            id_Vehicle = it.getValue(PartsTable.VEHICLE_ID),
            product_name = it.getValue(PartsTable.PRODUCT_NAME),
            price = it.getValue(PartsTable.PRICE),
            image = it.getValue(PartsTable.IMAGE)
        )
    }

    override suspend fun insert(details: PartsCreateDetails): Parts = withContext(Dispatchers.IO) {
        val id = jooq.insertInto(PartsTable.TABLE)
            .columns(
                PartsTable.VEHICLE_ID,
                PartsTable.PRODUCT_NAME,
                PartsTable.PRICE,
                PartsTable.IMAGE
            ).values(
                details.id_Vehicle,
                details.product_name,
                details.price,
                details.image
            ).returning(PartsTable.ID).fetchOne()?.let {
                it.getValue(PartsTable.ID) ?: throw IllegalStateException("No parts id returned")
            } ?: throw IllegalStateException("No parts id returned")

        Parts(
            id = PartsId(id),
            id_Vehicle = details.id_Vehicle,
            product_name = details.product_name,
            price = details.price,
            image = details.image
        )
    }

    override suspend fun updateImage(id: PartsId, imageUrl: String): Boolean =
        withContext(Dispatchers.IO) {
            jooq.update(PartsTable.TABLE)
                .set(PartsTable.IMAGE, imageUrl)
                .where(PartsTable.ID.eq(id.value))
                .execute() > 0
        }

}