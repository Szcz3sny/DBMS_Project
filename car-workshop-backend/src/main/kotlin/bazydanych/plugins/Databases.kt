package bazydanych.plugins

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import io.ktor.server.application.*

fun Application.buildPostgresConnectionPool(): HikariDataSource {
    Class.forName("org.postgresql.Driver")
    val config = HikariConfig().apply {
        jdbcUrl = environment.config.property("postgres.url").getString()
        driverClassName = "org.postgresql.Driver"
        username = environment.config.property("postgres.user").getString()
        password = environment.config.property("postgres.password").getString()
    }
    return HikariDataSource(config)
}
