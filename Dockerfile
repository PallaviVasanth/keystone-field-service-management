# ============================================================
# Build stage
# ============================================================
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw

RUN ./mvnw dependency:go-offline -DskipTests

COPY src src

RUN ./mvnw clean package -DskipTests


# ============================================================
# Runtime stage
# ============================================================
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/keystone-backend-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 10000

ENTRYPOINT ["sh", "-c", "exec java -jar app.jar --server.port=${PORT:-10000}"]