package bazydanych.plugins

import bazydanych.model.user.User
import bazydanych.model.user.UserId
import bazydanych.repository.UserRepository
import bazydanych.service.JwtGenerator
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*

fun Application.configureSecurity(userRepository: UserRepository): JwtGenerator {
    val jwtSecret = environment.config.property("jwt.secret").getString()
    val jwtIssuer = environment.config.property("jwt.issuer").getString()
    val jwtRealm = environment.config.property("jwt.realm").getString()

    authentication {
        jwt {
            realm = jwtRealm
            verifier(
                JWT
                    .require(Algorithm.HMAC256(jwtSecret))
                    .withIssuer(jwtIssuer)
                    .build()
            )
            validate { credential ->
                val userId = credential.payload.getClaim("user_id").asInt()
                userRepository.findUserById(UserId(userId))?.let { user ->
                    JWTUserPrincipal(JWTPrincipal(credential.payload), user)
                }
            }
        }
    }

    return JwtGenerator(jwtSecret, jwtIssuer)
}

data class JWTUserPrincipal(
    val base : JWTPrincipal,
    val user : User
) : Principal