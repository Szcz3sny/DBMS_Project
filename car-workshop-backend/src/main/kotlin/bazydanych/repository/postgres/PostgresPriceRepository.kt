package bazydanych.repository.postgres

import bazydanych.model.price.Price
import bazydanych.model.price.PriceId
import bazydanych.repository.PriceRepository
import bazydanych.service.PriceCreateDetails
import kotlinx.serialization.Serializable
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jooq.DSLContext
import org.jooq.Record
import bazydanych.repository.table.PricesTable
import bazydanych.util.BigDecimalSerializer
import java.math.BigDecimal

class PostgresPriceRepository(private val jooq: DSLContext) : PriceRepository {

    override suspend fun findPriceById(id: PriceId): Price? = withContext(Dispatchers.IO) {
        jooq.selectFrom(PricesTable.TABLE.where(PricesTable.ID.eq(id.value))).fetchOne { parse(it) }
    }

    override suspend fun createPrice(details: PriceCreateDetails): Boolean = withContext(Dispatchers.IO) {
        jooq.insertInto(PricesTable.TABLE)
            .columns(
                PricesTable.NAME,
                PricesTable.DESCRIPTION,
                PricesTable.PRICE
            )
            .values(
                details.name,
                details.description,
                details.price,
            )
            .returning(PricesTable.ID)
            .fetchOne() != null
    }

    override suspend fun updatePrice(id: PriceId, details: PriceCreateDetails): Price? =
        withContext(Dispatchers.IO) {
            val updatedRecord = jooq.update(PricesTable.TABLE)
                .set(PricesTable.NAME, details.name)
                .set(PricesTable.DESCRIPTION, details.description)
                .set(PricesTable.PRICE, details.price)
                .where(PricesTable.ID.eq(id.value))
                .returning()
                .fetchOne()

            updatedRecord?.let { parse(it) }
        }



    override suspend fun deletePrice(id: PriceId): Boolean = withContext(Dispatchers.IO) {
        jooq.deleteFrom(PricesTable.TABLE).where(PricesTable.ID.eq(id.value)).execute() > 0
    }

    override suspend fun save(details: PriceCreateDetails): PriceId = createPrice(details)
        .let { PriceId(jooq.lastID().toInt()) }

    private fun parse(it: Record): Price {
        return Price(
            id = PriceId(it.getValue(PricesTable.ID)),
            name = it.getValue(PricesTable.NAME),
            description = it.getValue(PricesTable.DESCRIPTION),
            price = it.getValue(PricesTable.PRICE)
        )
    }




    @Serializable
    data class PriceView(
        val id: PriceId,
        val name: String,
        val description: String,
        @Serializable(with = BigDecimalSerializer::class)
        val price: BigDecimal
    ) {
        companion object {
            fun fromPrice(price: Price) = PriceView(
                id = price.id,
                name = price.name,
                description = price.description,
                price = price.price
            )
        }
    }



}
