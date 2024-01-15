package bazydanych.service.form

import bazydanych.model.user.UserRole
import io.konform.validation.Validation
import io.konform.validation.jsonschema.maxLength
import io.konform.validation.jsonschema.minLength
import kotlinx.serialization.Serializable

@Serializable
data class UserCreateForm(
    val name: String,
    val surname: String,
    val phoneNumber: String,
    val role: UserRole
)

val validateUserCreateForm = Validation {
    UserCreateForm::name {
        minLength(5)
        maxLength(64)
    }

    UserCreateForm::surname {
        minLength(5)
        maxLength(64)
    }

    UserCreateForm::phoneNumber {
        minLength(5)
        maxLength(12)
    }
}