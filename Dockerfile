# ============================================================
# Build stage
# ============================================================
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x mvnw

# Download Maven dependencies
RUN ./mvnw dependency:go-offline -DskipTests

# Copy application source
COPY src src

# Build Spring Boot application
RUN ./mvnw clean package -DskipTests


# ============================================================
# Runtime stage
# ============================================================
FROM eclipse-temurin:21-jre

WORKDIR /app

# Maven produces keystone-backend.jar in this project
COPY --from=build /app/target/keystone-backend.jar app.jar

EXPOSE 10000

# Render supplies PORT for the web service.
# Fall back to 10000 for container execution.
ENTRYPOINT ["sh", "-c", "exec java -jar app.jar --server.port=${PORT:-10000}"]