package bazydanych.service.form
import kotlinx.serialization.Serializable

@Serializable
data class OrdersCreateForm(
    val ownerId: Int,
    val Id_Parts: Int,
    val Status: String
)