package za.ac.cput.unitrade.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {

    private Long id;
    private String title;
    private String description;
    private double price;
    private String category;
    private String itemCondition;
    private Long sellerId;
    private String sellerName;
}
