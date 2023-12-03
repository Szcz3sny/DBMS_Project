package bazydanych.service

import bazydanych.model.price.Price
import bazydanych.model.price.PriceId
import bazydanych.repository.PriceRepository
import bazydanych.service.dto.PriceView
import bazydanych.service.dto.toDto
import bazydanych.service.form.PriceCreateForm

class PriceService(
    private val priceRepository: PriceRepository,
) {

    suspend fun findPriceById(id: PriceId): PriceView? {
        val price = priceRepository.findPriceById(id) ?: return null
        return price.toDto()
    }

    suspend fun createPrice(form: PriceCreateForm): Price {
        if (form.price.signum() == -1) {
            throw IllegalArgumentException("Price cannot be negative")
        }

        val details = PriceCreateDetails(
            name = form.name,
            description = form.description,
            price = form.price,
        )

        val id = priceRepository.save(details)

        return Price(
            id = id,
            name = details.name,
            description = details.description,
            price = details.price,
        )
    }


    suspend fun updatePrice(id: PriceId, form: PriceCreateForm): Price {
        val details = PriceCreateDetails(
            name = form.name,
            description = form.description,
            price = form.price
        )

        return priceRepository.updatePrice(id, details) ?: throw NoSuchElementException("Price not found")
    }


    suspend fun deletePrice(id: PriceId): Boolean {
        return priceRepository.deletePrice(id)
    }
}
