package com.andrei.cocktail.chat;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class ChatMessage {

    @Id
    private String id;

    private String chatId;
    private String senderId;
    private String recipientId;
    private String content;
    private Date timestamp;
}
