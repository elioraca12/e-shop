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
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @OneToOne(fetch = FetchType.EAGER)
    private InventoryState inventoryState;
    @OneToOne(fetch = FetchType.EAGER)
    private Product product;
    @OneToOne(fetch = FetchType.EAGER)
    private Size size;
    private Date soldDate;
    private double soldPrice;
    private double quantity;

}
