package bazydanych.repository

import bazydanych.model.price.Price
import bazydanych.model.price.PriceId
import bazydanych.service.PriceCreateDetails

interface PriceRepository {

    suspend fun findPriceById(id: PriceId): Price?

    suspend fun findAllPrices(): List<Price>

    suspend fun updatePrice(id: PriceId, details: PriceCreateDetails): Price?

    suspend fun createPrice(details: PriceCreateDetails): Boolean

    suspend fun deletePrice(id: PriceId): Boolean

    suspend fun save(details: PriceCreateDetails): PriceId
}
