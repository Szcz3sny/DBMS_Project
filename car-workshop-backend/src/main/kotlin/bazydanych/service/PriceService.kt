package bazydanych.service

import bazydanych.model.price.Price
import bazydanych.model.price.PriceId
import bazydanych.repository.PriceRepository
import bazydanych.service.form.PriceCreateForm
import kotlinx.serialization.Serializable


class PriceService(
    private val priceRepository: PriceRepository,
) {

    suspend fun findPriceById(id: PriceId): PriceView? {
        val price = priceRepository.findPriceById(id) ?: return null
        return PriceView.fromPrice(price)}

    suspend fun createPrice(form: PriceCreateForm): Price {

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
            price = details.price.toString()
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

    @Serializable
    data class PriceView(
        val id: PriceId,
        val name: String,
        val description: String,
        val price: String
    ) {
        companion object {
            fun fromPrice(price: Price): PriceView {
                return PriceView(
                    id = price.id,
                    name = price.name,
                    description = price.description,
                    price = price.price.toString()
                )
            }
        }
    }



}
