package bazydanych.service.form

import kotlinx.serialization.Serializable

interface Form {

    fun validate(): List<ValidationError>
}

@Serializable
class ValidationError(val field: String, val message: String)