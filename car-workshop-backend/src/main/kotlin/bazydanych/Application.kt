package bazydanych

import bazydanych.module.userModule
import bazydanych.plugins.*
import bazydanych.repository.postgres.PostgresUserRepository
import bazydanych.service.UserService
import io.ktor.server.application.*
import org.jooq.SQLDialect
import org.jooq.impl.DSL
import org.jooq.impl.DefaultConfiguration

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.publicApi() {
    val database = buildPostgresConnectionPool()
    val jooqConfig = DefaultConfiguration().apply {
        set(database)
        set(SQLDialect.POSTGRES)
    }
    val jooq = DSL.using(jooqConfig)

    configureSerialization()
    configureSecurity()
    configureMonitoring()
    configureHTTP()
    configureRouting()

    val userRepository = PostgresUserRepository(jooq)
    val userService = UserService(userRepository)

    userModule(userService)
}
