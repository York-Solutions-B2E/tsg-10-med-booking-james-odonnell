FROM eclipse-temurin:21.0.5_11-jdk-noble AS build
WORKDIR /opt/app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean install
EXPOSE 8080
CMD ["./mvnw", "spring-boot:run"]

FROM eclipse-temurin:21.0.5_11-jre-noble AS final
WORKDIR /opt/app
EXPOSE 8080
COPY --from=build /opt/app/target/*.jar /opt/app/*.jar
ENTRYPOINT ["java", "-jar", "/opt/app/*.jar"]