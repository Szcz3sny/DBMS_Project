# Car Workshop Backend

### Wymagania

* Java 16+
* PostgreSQL

### Użyte technologie

* [Kotlin](https://kotlinlang.org/)
* [Ktor](https://ktor.io/)
* [jOOQ](https://www.jooq.org/)

### Instalacja

1. Klonowanie repozytorium
   ```sh
   git clone https://github.com/Szcz3sny/DBMS_Project.git
   ```

2. Kompilacja
   ```sh
   ./gradlew clean shadowJar
   ```
   Plik wynikowy znajduje się w `build/libs/car-workshop-backend-all.jar`


3. Konfiguracja
   ```yaml
   # plik application.yml
   ktor:
      application:
         modules: # aktywne moduły
            - bazydanych.ApplicationKt.publicApi
      deployment:
         port: 8080 # port na którym będzie uruchomiona aplikacja
   jwt: # konfiguracja JWT
      realm: "<realm>"
      secret: "<secret>"
      issuer: "<issuer>"
   postgres: # konfiguracja połączenia z bazą danych
      url: "jdbc:postgresql://<host>:<port>/<baza_danych>"
      user: "<użytkownik>"
      password: "<hasło>"
   ```
4. Inicjalizacja bazy danych

   Skrypt inicjalizujący strukturę bazy danych znajduje się w pliku `src/main/resources/init.sql`. Należy go uruchomić na bazie danych PostgreSQL.


5. Uruchomienie

   Przed uruchomieniem zaleca się przeniesienie pliku wynikowego poza katalog projektu.
   ```sh
   java -jar car-workshop-backend-all.jar
   ```
   
   
### Uwagi
Po pierwszym uruchomieniu zostanie utworzony użytkownik `admin` z hasłem `admin`. Zaleca się zmianę hasła po pierwszym zalogowaniu.