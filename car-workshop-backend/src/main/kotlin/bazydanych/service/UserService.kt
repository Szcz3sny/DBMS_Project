package bazydanych.service

import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.model.user.UserRole
import bazydanych.repository.UserRepository
import bazydanych.service.form.UserCreateForm
import bazydanych.service.form.UserLoginForm
import com.password4j.Password
import kotlinx.serialization.Serializable
import java.time.Duration
import java.util.UUID.randomUUID
import kotlin.random.Random

class UserService(
    private val userRepository: UserRepository,
    private val jwtGenerator: JwtGenerator
) {

    suspend fun findUserById(id: UserId): UserView? {
        return userRepository.findUserById(id)?.let { user -> UserView.fromUser(user) }
    }

    suspend fun createUser(form: UserCreateForm): Pair<User, Pair<String, String>> {
        val login = form.name.lowercase() + "." + form.surname.lowercase() + Random.nextInt(1000)
        val password = randomUUID().toString()

        val details = UserCreateDetails(
            name = form.name,
            surname = form.surname,
            phoneNumber = form.phoneNumber,
            login = form.login,
            password = password,
            role = form.role
        )

        val user = createUser(details)
        return Pair(user, Pair(login, password))
    }

    suspend fun createUser(details: UserCreateDetails): User {
        return userRepository.insert(
            details.copy(
                password = Password.hash(details.password).addRandomSalt().withArgon2().result
            )
        )
    }

    suspend fun deleteUser(id: UserId): Boolean {
        return userRepository.delete(id)
    }

    suspend fun login(form: UserLoginForm): Pair<User, String>? {
        return userRepository.findUserByLogin(form.login)?.let {
            if (Password.check(form.password, it.password).withArgon2()) {
                val token = jwtGenerator.createToken(
                    it,
                    if (form.remember) Duration.ofDays(3) else Duration.ofHours(3)
                )
                Pair(it, token)
            } else null
        }
    }

    suspend fun createDefaultUserIfNotExists() {
        if (!userRepository.existsByLogin("admin"))
            createUser(
                UserCreateDetails(
                    name = "admin",
                    surname = "adminowski",
                    phoneNumber = "000000000",
                    login = "admin",
                    password = "admin",
                    role = UserRole.ADMIN
                )
            )
    }

    @Serializable
    data class UserView(
        val id: UserId,
        val name: String,
        val surname: String,
        val phoneNumber: String,
        val role: UserRole,
    ) {
        companion object {
            fun fromUser(user: User) = UserView(
                id = user.id,
                name = user.name,
                surname = user.surname,
                phoneNumber = user.phoneNumber,
                role = user.role,
            )
        }
    }
}