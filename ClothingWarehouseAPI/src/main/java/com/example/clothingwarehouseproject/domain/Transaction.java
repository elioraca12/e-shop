package com.example.clothingwarehouseproject.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Date transactionDate;
    @OneToOne(fetch = FetchType.LAZY)
    private Inventory inventory;
    private double soldPrice;
    @OneToOne(fetch = FetchType.EAGER)
    private User user;

}
