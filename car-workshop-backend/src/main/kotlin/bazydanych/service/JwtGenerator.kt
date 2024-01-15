package bazydanych.service

import bazydanych.model.user.User
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.time.Duration
import java.time.Instant

class JwtGenerator(
    private val secret: String,
    private val issuer: String
) {

    fun createToken(user: User, duration: Duration): String =
        JWT.create()
            .withClaim("user_id", user.id.value)
            .withIssuer(issuer)
            .withExpiresAt(Instant.now().plus(duration))
            .sign(Algorithm.HMAC256(secret))
}