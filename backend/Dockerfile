FROM gradle:8.1.1-jdk17 as builder

WORKDIR /backend
COPY . /backend/
RUN gradle build -x test

FROM openjdk:21-ea-17-jdk-slim as runner
RUN mkdir /opt/app
COPY --from=builder /backend/out/artifacts/carr_jar/carr.jar /opt/app/carr.jar
CMD ["java", "-jar", "/opt/app/carr.jar"]

EXPOSE 8080/tcp