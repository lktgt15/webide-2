package com.webide2.controller;

import com.webide2.domain.CodeResult;
import com.webide2.domain.MessageDTO;
import com.webide2.service.ExecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exec")
@CrossOrigin(origins="*")
public class ExecController {
    private final ExecService execService;

    @Autowired
    public ExecController(ExecService execService){
        this.execService = execService;
    }

    @PostMapping
    public CodeResult codeResult(@RequestBody MessageDTO messageDTO) throws Exception{
        System.out.println(messageDTO.getCode());
        System.out.println(messageDTO.getId());
        CodeResult codeResult = execService.processCode(messageDTO);
        return codeResult;
    }
}
