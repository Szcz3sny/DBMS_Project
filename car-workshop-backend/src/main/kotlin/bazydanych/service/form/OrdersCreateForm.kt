package bazydanych.service.form
import kotlinx.serialization.Serializable

@Serializable
data class OrdersCreateForm(
    val ownerId: Int,
    val partsId: Int,
    val status: String
)