package bazydanych.service.form

import io.konform.validation.Validation
import io.konform.validation.jsonschema.maxLength
import io.konform.validation.jsonschema.minLength
import kotlinx.serialization.Serializable

@Serializable
data class UserLoginForm(
    val login: String,
    val password: String,
    val remember: Boolean
)

val validateLoginForm = Validation {
    UserLoginForm::login {
        minLength(5)
        maxLength(64)
    }

    UserLoginForm::password {
        minLength(1)
    }
}