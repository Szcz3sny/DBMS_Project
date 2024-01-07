package bazydanych

import bazydanych.module.*
import bazydanych.plugins.*
import bazydanych.repository.postgres.*
import bazydanych.service.*
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
    configureValidation()

    val userRepository = PostgresUserRepository(jooq)
    val priceRepository = PostgresPriceRepository(jooq)
    val vehicleRepository = PostgresVehicleRepository(jooq)
    val repairsRepository = PostgresRepairsRepository(jooq)
    val repairsPhotosRepository = PostgresRepairPhotosRepository(jooq)
    val filesRepository = PostgresFileDataRepository(jooq)

    val jwtGenerator = configureSecurity(userRepository)
    val fileStorageService = BaseFileStorageService(filesRepository, "https://api.bazydanych.fun/v1/images/{token}") // TODO: Move to config

    val userService = UserService(userRepository, jwtGenerator)
    val priceService = PriceService(priceRepository)
    val vehicleService = VehicleService(vehicleRepository, userService)
    val repairsService = RepairsService(repairsRepository, repairsPhotosRepository, fileStorageService)

    runBlocking {
        userService.createDefaultUserIfNotExists()
    }

    userModule(userService)
    priceModule(priceService)
    vehicleModule(userService, vehicleService)
    repairsModule(repairsService)
    imagesModule(fileStorageService)
}
