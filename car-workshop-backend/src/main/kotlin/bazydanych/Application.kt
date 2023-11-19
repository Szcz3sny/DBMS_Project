package bazydanych

import bazydanych.module.priceModule
import bazydanych.module.userModule
import bazydanych.plugins.*
import bazydanych.repository.postgres.PostgresUserRepository
import bazydanych.repository.postgres.PostgresPriceRepository
import bazydanych.service.UserService
import bazydanych.service.PriceService
import io.ktor.server.application.*
import kotlinx.coroutines.runBlocking
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
    configureMonitoring()
    configureHTTP()

    val userRepository = PostgresUserRepository(jooq)
    val priceRepository = PostgresPriceRepository(jooq)
    val jwtGenerator = configureSecurity(userRepository)
    val userService = UserService(userRepository, jwtGenerator)
    val priceService = PriceService(priceRepository)


    runBlocking {
        userService.createDefaultUserIfNotExists()
    }

    userModule(userService)
    priceModule(priceService)
}
