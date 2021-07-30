package com.webide2.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webide2.domain.CodeResult;
import com.webide2.domain.MessageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;

@Controller
@CrossOrigin(origins = "*")
public class WebSocketController {
    private final String executionServer;

    @Autowired
    public WebSocketController(@Value("${execution-server-uri}") String executionServer){
        this.executionServer = executionServer;
    }

    @MessageMapping("hello")
    @SendTo("/topic/ide")
    public CodeResult codeResult(MessageDTO messageDTO) throws Exception{
        System.out.println(messageDTO.getCode());
        System.out.println(executionServer);

        // Header
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        // Obj to String
        ObjectMapper objectMapper = new ObjectMapper();
        String stringMessageDTO = objectMapper.writeValueAsString(messageDTO);

        // Entity
        HttpEntity entity = new HttpEntity(stringMessageDTO, httpHeaders);

        // RestTemplate
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<CodeResult> responseEntity = restTemplate.exchange(executionServer, HttpMethod.POST, entity, CodeResult.class);

//        CodeResult codeResult = ideService.processCode(messageDTO);
        return responseEntity.getBody();
    }
}
