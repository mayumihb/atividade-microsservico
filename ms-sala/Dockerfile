FROM maven:3.9.8-amazoncorretto-21 AS build
WORKDIR /home/app
COPY src ./src
COPY pom.xml .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY --from=build /home/app/target/ms-sala-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8092
ENTRYPOINT ["java", \
            "--add-opens=java.base/java.lang=ALL-UNNAMED", \
            "--add-opens=java.base/java.util=ALL-UNNAMED", \
            "--add-opens=java.base/java.text=ALL-UNNAMED", \
            "--add-opens=java.base/java.io=ALL-UNNAMED", \
            "--add-opens=java.base/java.net=ALL-UNNAMED", \
            "-jar", "app.jar"]