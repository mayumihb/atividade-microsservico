package com.github.ms_reserva.domain.model.value;

import jakarta.persistence.Embeddable;
import lombok.Getter;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
@Embeddable
public class dataReserva {
    private String dataReserva;

    protected dataReserva() {
    }

    public dataReserva(String dataReserva) {
        Instant instantReserva = Instant.parse(dataReserva);

        ZoneId systemZone = ZoneId.systemDefault();
        LocalDateTime dataReservaDateTime = LocalDateTime.ofInstant(instantReserva, systemZone);
        if (dataReservaDateTime.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("A data da reserva não pode estar no passado.");
        }
        this.dataReserva = dataReserva;
    }
    public boolean isBefore(LocalDateTime outraData) {
        Instant instantReserva = Instant.parse(this.dataReserva);

        ZoneId systemZone = ZoneId.systemDefault();
        LocalDateTime dataReservaDateTime = LocalDateTime.ofInstant(instantReserva, systemZone);
        return dataReservaDateTime.isBefore(outraData);
    }
}