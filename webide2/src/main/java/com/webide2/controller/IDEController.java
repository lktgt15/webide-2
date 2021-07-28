package com.webide2.controller;

import com.webide2.domain.CodeResult;
import com.webide2.domain.MessageDTO;
import com.webide2.service.IDEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(origins = "*")
public class IDEController {
    private final IDEService ideService;

    @Autowired
    public IDEController(IDEService ideService){
        this.ideService = ideService;
    }

    @MessageMapping("hello")
    @SendTo("/topic/ide")
    public CodeResult codeResult(MessageDTO messageDTO) throws Exception{
        System.out.println(messageDTO.getCode());
        CodeResult codeResult = ideService.processCode(messageDTO);
        return codeResult;
    }
}
