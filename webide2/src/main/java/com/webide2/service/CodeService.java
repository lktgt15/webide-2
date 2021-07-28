package com.webide2.service;

import com.webide2.domain.CodeForm;
import com.webide2.domain.MessageDTO;
import com.webide2.domain.Rule;
import org.springframework.stereotype.Service;

@Service
public class CodeService {

    public CodeForm processCode(MessageDTO messageDTO){
        CodeForm codeForm = new CodeForm();

        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append("#include <cstdio>\n" +
                "#include <random>\n" +
                "\n" +
                "using namespace std;\n" +
                "\n" +
                "int main(){\n" +
                "\trandom_device rd;\n" +
                "\tmt19937 gen(rd());");

        Rule rule = messageDTO.getRule();

        codeBuilder.append(
                randomTemplate(
                    rule.getRangeBegin(), rule.getRangeEnd()
                )
        );
        codeBuilder.append("}");

        codeForm.setCode(codeBuilder.toString());
        return codeForm;
    }

    private String randomTemplate(int rangeBegin, int rangeEnd){
        return "\tuniform_int_distribution<int> kgen("+rangeBegin+","+rangeEnd+");\n" +
//                "\tuniform_int_distribution<int> rangen("+valueBegin+","+valueEnd+");\n" +
                "\tuniform_int_distribution<int> rangen(0, 100);\n" +
                "\tint k = kgen(gen);\n" +
                "\tprintf(\"%d\\n\",k);\n" +
                "\tfor(int i=0;i<k;i++) printf(\"%d \",rangen(gen));\n" +
                "\tprintf(\"\\n\");\n";
    }
}
